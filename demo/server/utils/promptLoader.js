import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadPrompt(productA, productB) {
  try {
    const promptPath = path.resolve(__dirname, '../../prompts/head-to-head.md');
    let promptContent = await fs.readFile(promptPath, 'utf-8');

    // Safe replacement ignoring case and globally if needed.
    // We use a simple replaceAll for the exact placeholders.
    promptContent = promptContent.replaceAll('{Product A}', productA);
    promptContent = promptContent.replaceAll('{Product B}', productB);

    return promptContent;
  } catch (error) {
    console.error('Error loading prompt file:', error);
    throw new Error('Failed to load comparison prompt template.');
  }
}
