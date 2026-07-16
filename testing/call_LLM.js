import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------
// Load Configuration
// ----------------------------
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "test_cases.json"), "utf8")
);

// ----------------------------
// Load Prompt
// ----------------------------
let prompt = fs.readFileSync(
  path.join(__dirname, config.promptFile),
  "utf8"
);

// ----------------------------
// Replace Variables
// ----------------------------

for (const [key, value] of Object.entries(config.variables)) {
  let replacement;

  if (Array.isArray(value)) {
    replacement = value.map((item) => `- ${item}`).join("\n");
  } else {
    replacement = value;
  }

  prompt = prompt.replaceAll(`{${key}}`, replacement);
}

// ----------------------------
// Build Evaluation Report
// ----------------------------

let report = `# Prompt Evaluation

## Prompt File

${config.promptFile}

---

## Test Configuration

`;

for (const [key, value] of Object.entries(config.variables)) {

  report += `### ${key}\n\n`;

  if (Array.isArray(value)) {

    value.forEach(item => {
      report += `- ${item}\n`;
    });

  } else {

    report += `${value}\n`;

  }

  report += `\n`;
}

report += `---\n`;

// ----------------------------
// Run Tests
// ----------------------------

async function run() {

  console.clear();

  console.log("==================================");
  console.log("Running Prompt Evaluation");
  console.log("==================================");

  console.log(`Model: ${config.model}`);
  console.log("");

  for (const temperature of config.temperatures) {

    console.log(`Testing Temperature ${temperature}...`);

    try {

      const response = await ai.models.generateContent({
        model: config.model,
        contents: prompt,
        config: {
          temperature,
        },
      });

      console.log("✓ Complete");

      report += `

# 🌡️ Temperature ${temperature}

> [!IMPORTANT]
> **Raw LLM Output (Unmodified)**

${response.text}

---

`;

    } catch (err) {

      console.error(err);

      report += `

# 🌡️ Temperature ${temperature}

ERROR

\`\`\`
${err}
\`\`\`

---

`;

    }

  }

  report += `

# 📈 Output Observation

> [!NOTE]

| Temperature | Observation |
|-------------|-------------|
| **0.0** | |
| **0.5** | |
| **1.0** | |

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

  const outputPath = path.join(__dirname, config.evaluationFile);

  fs.mkdirSync(path.dirname(outputPath), {
    recursive: true,
  });

  fs.writeFileSync(outputPath, report);

  console.log("");
  console.log("==================================");
  console.log("Evaluation saved successfully.");
  console.log(outputPath);
  console.log("==================================");
}

run();