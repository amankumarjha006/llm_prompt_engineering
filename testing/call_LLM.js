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
// Load configuration
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

// Replace placeholders
for (const [key, value] of Object.entries(config.variables)) {
  prompt = prompt.replaceAll(`{${key}}`, value);
}

// ----------------------------
// Build Evaluation Report
// ----------------------------
let report = `# Prompt Evaluation

## Prompt File

${config.promptFile}

---

## Test Variables

`;

for (const [key, value] of Object.entries(config.variables)) {
  report += `- **${key}:** ${value}\n`;
}

report += `\n---\n`;

// ----------------------------
// Run Tests
// ----------------------------
async function run() {

  console.clear();

  console.log("==================================");
  console.log("Running Prompt Evaluation");
  console.log("==================================");

  for (const temperature of config.temperatures) {

    console.log(`\nTesting Temperature ${temperature}...`);

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

# Temperature ${temperature}

\`\`\`
${response.text}
\`\`\`

---

`;

    } catch (err) {

      console.error(err);

      report += `

# Temperature ${temperature}

ERROR:

${err}

---

`;

    }

  }

  report += `

# Comparison

> Fill this section manually.

---

# Hallucinations

> Fill this section manually.

---

# Improvements

> Fill this section manually.

---

# Final Verdict

> Fill this section manually.

`;

  const outputPath = path.join(__dirname, config.evaluationFile);

  fs.mkdirSync(path.dirname(outputPath), {
    recursive: true,
  });

  fs.writeFileSync(outputPath, report);

  console.log("\n==================================");
  console.log("Evaluation saved successfully.");
  console.log(outputPath);
  console.log("==================================");
}

run();