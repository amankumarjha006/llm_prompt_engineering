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

// Read config
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "test_cases.json"), "utf8")
);

// Read prompt file
let prompt = fs.readFileSync(
  path.join(__dirname, config.promptFile),
  "utf8"
);

// Replace placeholders
for (const [key, value] of Object.entries(config.variables)) {
  prompt = prompt.replaceAll(`{${key}}`, value);
}

async function run() {
  console.clear();

  console.log("==============================================");
  console.log("Prompt Evaluation");
  console.log("==============================================");
  console.log(`Model       : ${config.model}`);
  console.log(`Temperature : ${config.temperature}`);
  console.log(`Prompt File : ${config.promptFile}`);
  console.log("==============================================\n");

  try {
    const response = await ai.models.generateContent({
      model: config.model,
      contents: prompt,
      config: {
        temperature: config.temperature,
      },
    });

    console.log(response.text);
  } catch (err) {
    console.error(err);
  }
}

run();