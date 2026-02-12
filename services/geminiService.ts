import { Message } from "../types";

/**
 * Sends conversation messages to Gemini via backend /api/chat (API key stays server-side).
 */
export const sendMessageToGemini = async (messages: Message[]): Promise<string> => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      return data.error || "Error: Could not connect to AI service. Please ensure your API key is valid.";
    }
    return data.text ?? "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not connect to AI service. Please ensure your API key is valid.";
  }
};

/**
 * Answer a question using only the given document chunks. Used for retrieval simulation summary.
 * Calls backend /api/answer-from-context.
 */
export const answerFromContext = async (context: string, question: string): Promise<string> => {
  try {
    const res = await fetch('/api/answer-from-context', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, question }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      return data.error || "Error: Could not generate answer. Please try again.";
    }
    return data.text?.trim() || "No answer generated.";
  } catch (error) {
    console.error("Gemini answerFromContext Error:", error);
    return "Error: Could not generate answer. Please try again.";
  }
};

/**
 * Answer a question using general knowledge (fallback when document chunks don't contain the answer).
 * Calls backend /api/answer-from-web.
 */
export const answerFromWeb = async (question: string): Promise<string> => {
  try {
    const res = await fetch('/api/answer-from-web', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      return data.error || "Error: Could not generate answer from web.";
    }
    return data.text?.trim() || "No answer generated.";
  } catch (error) {
    console.error("Gemini answerFromWeb Error:", error);
    return "Error: Could not generate answer from web.";
  }
};
