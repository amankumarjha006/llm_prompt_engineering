import { GoogleGenAI } from '@google/genai';
import { loadPrompt } from '../utils/promptLoader.js';
import { parseGeminiJson } from '../utils/jsonParser.js';
import dotenv from 'dotenv';

dotenv.config();

// Ensure we have a model and API key.
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('WARNING: GEMINI_API_KEY is not set in environment variables.');
}
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Initialize the Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: apiKey });

export async function compareProducts(productA, productB) {
  if (!apiKey) {
    throw new Error('Gemini API key is not configured on the server.');
  }

  if (!productA || !productB) {
    throw new Error('Both Product A and Product B are required.');
  }

  // Load and prepare the prompt
  const prompt = await loadPrompt(productA, productB);

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.2, // Low temperature for factual consistency
        responseMimeType: 'application/json', // Suggest JSON mode where supported
      }
    });

    const rawText = response.text;
    
    if (!rawText) {
      throw new Error('Empty response received from Gemini.');
    }

    // Parse the JSON definsively
    const parsedJson = parseGeminiJson(rawText);
    
    return parsedJson;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(error.message || 'Failed to generate comparison with AI.');
  }
}
