import { GoogleGenAI } from '@google/genai';

const SYS = `Answer ONLY using the document excerpt. If the excerpt does not contain the answer, respond exactly with "The excerpt does not contain this information."`;

const headers = { 'Content-Type': 'application/json' };

export const handler = async (event: { httpMethod: string; body?: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not set' }) };
  }
  let context = '';
  let question = '';
  try {
    const json = event.body ? JSON.parse(event.body) : {};
    context = typeof json.context === 'string' ? json.context : '';
    question = typeof json.question === 'string' ? json.question : '';
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Invalid JSON body' }) };
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const truncated = context.length > 8000 ? context.slice(0, 8000) + '…' : context;
    const prompt = `Document excerpt:\n\n${truncated}\n\nQuestion: ${question}`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { systemInstruction: SYS },
    });
    const text = response.text?.trim() || 'No answer generated.';
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, text }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: String(err && (err as Error).message) }) };
  }
};
