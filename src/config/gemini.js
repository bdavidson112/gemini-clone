const GEMINI_API_KEY = "AIzaSyAA1ULNiNFjnW7fkCwx4shUthHiek-9vW0"; // Replace with your actual API key.

//import { GoogleGenerativeAI } from '@google/genai'; // Use the package name directly
import { GoogleGenerativeAI } from "/node_modules/.vite/deps/@google_generative-ai.js?v=c8c1beac";

// Initialize the Google Generative AI model with the API key.
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // Use the API key directly.
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function sendMessage(message) {
  const result = await model.generateContent(message);
  const response = result.response;
  return response.text();
}

export default sendMessage;