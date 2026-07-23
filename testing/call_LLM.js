import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ============================================================
// Gemini Client
// ============================================================

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is missing. Add it to your .env file."
  );
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ============================================================
// Directory Setup
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// Load Test Configuration
// ============================================================

const configPath = path.join(__dirname, "test_cases.json");

if (!fs.existsSync(configPath)) {
  throw new Error(
    `Configuration file not found:\n${configPath}`
  );
}

const config = JSON.parse(
  fs.readFileSync(configPath, "utf8")
);

// ============================================================
// Validate Global Configuration
// ============================================================

if (!config._documentation) {
  throw new Error(
    'Missing "_documentation" section in test_cases.json'
  );
}

if (!config.activeTestCase) {
  throw new Error(
    'Missing "activeTestCase" in test_cases.json'
  );
}

if (!config.testCases) {
  throw new Error(
    'Missing "testCases" section in test_cases.json'
  );
}

// ============================================================
// Select Active Test Case
// ============================================================

const testCaseId = config.activeTestCase;
const testCase = config.testCases[testCaseId];

if (!testCase) {
  throw new Error(
    `Test case "${testCaseId}" was not found in test_cases.json`
  );
}

// ============================================================
// Extract Configuration
// ============================================================

const model = config._documentation.model;
const temperatures = config._documentation.temperatures;

const testName = testCase.name;
const testDescription = testCase.description;

const promptFile = testCase.promptFile;
const evaluationFile = testCase.evaluationFile;

const variables = testCase.variables || {};

// ============================================================
// Validate Test Case
// ============================================================

if (!model) {
  throw new Error(
    'Missing "model" in _documentation'
  );
}

if (
  !Array.isArray(temperatures) ||
  temperatures.length === 0
) {
  throw new Error(
    '"temperatures" must be a non-empty array'
  );
}

if (!promptFile) {
  throw new Error(
    `Missing "promptFile" in test case "${testCaseId}"`
  );
}

if (!evaluationFile) {
  throw new Error(
    `Missing "evaluationFile" in test case "${testCaseId}"`
  );
}

// ============================================================
// Load Prompt
// ============================================================

const promptPath = path.resolve(
  __dirname,
  promptFile
);

if (!fs.existsSync(promptPath)) {
  throw new Error(
    `Prompt file not found:\n${promptPath}`
  );
}

let prompt = fs.readFileSync(
  promptPath,
  "utf8"
);

// ============================================================
// Replace Prompt Variables
// ============================================================

for (const [key, value] of Object.entries(variables)) {

  let replacement;

  if (Array.isArray(value)) {

    replacement = value
      .map((item) => `- ${item}`)
      .join("\n");

  } else if (
    typeof value === "object" &&
    value !== null
  ) {

    replacement = JSON.stringify(
      value,
      null,
      2
    );

  } else {

    replacement = String(value);

  }

  prompt = prompt.replaceAll(
    `{${key}}`,
    replacement
  );
}

// ============================================================
// Check for Unresolved Variables
// ============================================================

const unresolvedVariables =
  prompt.match(/\{[^{}]+\}/g);

if (unresolvedVariables) {

  const uniqueVariables = [
    ...new Set(unresolvedVariables),
  ];

  console.warn("");
  console.warn(
    "⚠ Warning: Unresolved prompt variables detected:"
  );

  uniqueVariables.forEach((variable) => {
    console.warn(`  ${variable}`);
  });

  console.warn("");
}

// ============================================================
// Build Evaluation Report
// ============================================================

let report = `# Prompt Evaluation

## Test Case

**ID:** ${testCaseId}

**Name:** ${testName}

**Description:** ${testDescription}

---

## Prompt File

${promptFile}

---

## Model Configuration

| Parameter | Value |
|-----------|-------|
| **Model** | ${model} |
| **Temperatures** | ${temperatures.join(", ")} |

---

## Test Configuration

`;

// ============================================================
// Add Variables to Evaluation Report
// ============================================================

for (const [key, value] of Object.entries(variables)) {

  report += `### ${key}\n\n`;

  if (Array.isArray(value)) {

    value.forEach((item) => {
      report += `- ${item}\n`;
    });

  } else if (
    typeof value === "object" &&
    value !== null
  ) {

    report += `\`\`\`json\n`;
    report += `${JSON.stringify(value, null, 2)}\n`;
    report += `\`\`\`\n`;

  } else {

    report += `${value}\n`;

  }

  report += `\n`;
}

report += `---\n`;

// ============================================================
// Run Prompt Evaluation
// ============================================================

async function run() {

  console.clear();

  console.log(
    "=========================================="
  );

  console.log(
    "        Running Prompt Evaluation"
  );

  console.log(
    "=========================================="
  );

  console.log("");

  console.log(
    `Test Case : ${testCaseId}`
  );

  console.log(
    `Prompt    : ${testName}`
  );

  console.log(
    `Model     : ${model}`
  );

  console.log(
    `Temps     : ${temperatures.join(", ")}`
  );

  console.log("");

  // ==========================================================
  // Run Each Temperature
  // ==========================================================

  for (const temperature of temperatures) {

    console.log(
      `Testing Temperature ${temperature}...`
    );

    try {

      const response =
        await ai.models.generateContent({

          model,

          contents: prompt,

          config: {
            temperature,
          },

        });

      const output =
        response.text ||
        "No text response returned.";

      console.log(
        `✓ Temperature ${temperature} Complete`
      );

      report += `

# 🌡️ Temperature ${temperature}

> [!IMPORTANT]
> **Raw LLM Output (Unmodified)**

${output}

---

`;

    } catch (err) {

      console.error(
        `✗ Temperature ${temperature} Failed`
      );

      console.error(err);

      const errorMessage =
        err instanceof Error
          ? err.stack || err.message
          : String(err);

      report += `

# 🌡️ Temperature ${temperature}

> [!CAUTION]
> **Generation Failed**

\`\`\`text
${errorMessage}
\`\`\`

---

`;

    }
  }

  // ==========================================================
  // Manual Evaluation Sections
  // ==========================================================

  report += `

# 📈 Output Observation

> [!NOTE]

| Temperature | Observation |
|-------------|-------------|
${temperatures
  .map(
    (temperature) =>
      `| **${temperature}** | |`
  )
  .join("\n")}

---

# ⚠️ Hallucination Analysis

> [!NOTE]

| Category | Observation |
|----------|-------------|
| **Major Hallucinations** | |
| **Minor Issues** | |

---

# 🏁 Final Verdict

> [!TIP]

Fill this section manually.

`;

  // ==========================================================
  // Save Evaluation Report
  // ==========================================================

  const outputPath = path.resolve(
    __dirname,
    evaluationFile
  );

  fs.mkdirSync(
    path.dirname(outputPath),
    {
      recursive: true,
    }
  );

  fs.writeFileSync(
    outputPath,
    report,
    "utf8"
  );

  // ==========================================================
  // Completion Message
  // ==========================================================

  console.log("");

  console.log(
    "=========================================="
  );

  console.log(
    "Evaluation saved successfully."
  );

  console.log(
    "=========================================="
  );

  console.log("");

  console.log(
    `Test Case : ${testCaseId}`
  );

  console.log(
    `Output    : ${outputPath}`
  );

  console.log("");
}

// ============================================================
// Start Evaluation
// ============================================================

run().catch((err) => {

  console.error("");

  console.error(
    "Fatal evaluation error:"
  );

  console.error(err);

  process.exit(1);

});