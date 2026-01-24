
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are the Unicore AI Orchestrator, the central intelligence of the Unifuse platform. 
You coordinate between specialized Expert Nodes: Enrollment, Student Success, Advancement, and Operations.
The platform has several modules: Enrollment Hub, Student Success Hub, Advancement Hub, and Operational Excellence Hub.
You have access to knowledge about:
- Application conversion rates (currently 62%, up 8.3% YoY)
- Student retention (89.2%)
- Annual giving ($2.4M YTD)
- AI automation rates (87.3%)
- Document processing queues (35 items pending review)
Be professional, concise, and helpful. Your role is to orchestrate user intents and guide them through the platform's capabilities.
`;

/**
 * Sends conversation messages to Gemini using the recommended ai.models.generateContent pattern.
 * This ensures the model has access to the full context of the conversation.
 */
export const sendMessageToGemini = async (messages: Message[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Map internal message history to the Gemini API content structure
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Directly access the .text property from the GenerateContentResponse object
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not connect to AI service. Please ensure your API key is valid.";
  }
};
