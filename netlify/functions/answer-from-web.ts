import { GoogleGenAI } from '@google/genai';

const SYS = `Answer the user's question concisely (1–3 sentences) using general knowledge. Be accurate and cite that this is general knowledge.`;

const headers = { 'Content-Type': 'application/json' };

export const handler = async (event: { httpMethod: string; body?: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not set' }) };
  }
  let question = '';
  try {
    const json = event.body ? JSON.parse(event.body) : {};
    question = typeof json.question === 'string' ? json.question : '';
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Invalid JSON body' }) };
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: question,
      config: { systemInstruction: SYS },
    });
    const text = response.text?.trim() || 'No answer generated.';
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, text }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: String(err && (err as Error).message) }) };
  }
};
