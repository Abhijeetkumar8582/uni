import { GoogleGenAI } from '@google/genai';

const SYSTEM = `You are the Unicore AI Orchestrator, the central intelligence of the Unifuse platform. You coordinate between specialized Expert Nodes: Enrollment, Student Success, Advancement, and Operations. Be professional, concise, and helpful.`;

const headers = { 'Content-Type': 'application/json' };

export const handler = async (event: { httpMethod: string; body?: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not set' }) };
  }
  let messages: { role: string; content: string }[] = [];
  try {
    const json = event.body ? JSON.parse(event.body) : {};
    messages = Array.isArray(json.messages) ? json.messages : [];
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Invalid JSON body. Expected { messages: Array }' }) };
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: { systemInstruction: SYSTEM },
    });
    const text = response.text || "I'm sorry, I couldn't generate a response.";
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, text }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: String(err && (err as Error).message) }) };
  }
};
