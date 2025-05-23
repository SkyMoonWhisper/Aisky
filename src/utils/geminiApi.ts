import { GoogleGenerativeAI } from '@google/generative-ai';

// // TODO: Ganti dengan API key Gemini Anda
// // Untuk mendapatkan API key, kunjungi: https://makersuite.google.com/app/apikey
const API_KEY = 'AIzaSyCPzhgE2gj9UKCc5wMbYZ8Uw4VAmFQnlWg';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

export const sendMessageToGemini = async (prompt: string): Promise<string> => {
  try {
    // Check if API key is set
    if (API_KEY === 'AIzaSyCPzhgE2gj9UKCc5wMbYZ8Uw4VAmFQnlWg') {
      return `Error: Api belum di konfigurasi rel coba update file src/utils/geminiApi.ts dengan API key Gemini yang valid.`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return 'An unknown error occurred while communicating with the AI service.';
  }
};