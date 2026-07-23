export function parseGeminiJson(rawText) {
  try {
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('Empty or invalid response from Gemini');
    }

    let cleanedText = rawText.trim();

    // Strip markdown JSON code fences if they exist
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.substring(7);
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.substring(3);
    }
    
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }

    cleanedText = cleanedText.trim();

    // Safely parse using native JSON.parse
    const parsed = JSON.parse(cleanedText);

    // Basic structural validation
    if (!parsed || !parsed.comparison || !parsed.comparison.productA || !parsed.comparison.productB) {
      throw new Error('Parsed JSON does not match the expected basic structure');
    }

    return parsed;
  } catch (error) {
    console.error('JSON Parsing Error:', error.message);
    throw new Error('Failed to parse the structured comparison data from the AI.');
  }
}
