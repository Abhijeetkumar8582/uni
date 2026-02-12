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
 * Sends conversation messages to Gemini using the preview model.
 */
export const sendMessageToGemini = async (messages: Message[]): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return "Error: Could not connect to AI service. Please ensure your API key is valid.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not connect to AI service. Please ensure your API key is valid.";
  }
};

const ANSWER_FROM_CONTEXT_SYSTEM = `
You must answer ONLY using the document excerpt provided by the user. Do not use any other knowledge or assumptions.
- If the excerpt clearly contains the answer: give a concise answer (1–3 sentences) quoting or paraphrasing only from the excerpt.
- If the excerpt does not contain the answer or is unclear: respond exactly with "The excerpt does not contain this information."
Never add information that is not in the excerpt. Never guess or infer from outside knowledge.
`;

/**
 * Answer a question using only the given document chunks. Used for retrieval simulation summary.
 */
export const answerFromContext = async (context: string, question: string): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return "Error: API key not configured.";
    const ai = new GoogleGenAI({ apiKey });
    const truncated = context.length > 8000 ? context.slice(0, 8000) + "…" : context;
    const prompt = `Document excerpt (extracted chunks):\n\n${truncated}\n\nQuestion: ${question}\n\nAnswer using only the excerpt above. If it does not contain the answer, say "The excerpt does not contain this information."`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: ANSWER_FROM_CONTEXT_SYSTEM,
      },
    });
    return response.text?.trim() || "No answer generated.";
  } catch (error) {
    console.error("Gemini answerFromContext Error:", error);
    return "Error: Could not generate answer. Please try again.";
  }
};

const ANSWER_FROM_WEB_SYSTEM = `
You are a helpful assistant. Answer the user's question concisely (1–3 sentences) using general knowledge.
Be accurate and cite that this is general knowledge, not from a specific document.
`;

/**
 * Answer a question using general knowledge (fallback when document chunks don't contain the answer).
 */
export const answerFromWeb = async (question: string): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return "Error: API key not configured.";
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: question,
      config: {
        systemInstruction: ANSWER_FROM_WEB_SYSTEM,
      },
    });
    return response.text?.trim() || "No answer generated.";
  } catch (error) {
    console.error("Gemini answerFromWeb Error:", error);
    return "Error: Could not generate answer from web.";
  }
};
