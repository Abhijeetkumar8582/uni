import { GoogleGenAI } from '@google/genai';

const headers = { 'Content-Type': 'application/json' };

export const handler = async (event: { httpMethod: string; body?: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not set' }) };
  }
  let texts: string[] = [];
  try {
    const json = event.body ? JSON.parse(event.body) : {};
    texts = Array.isArray(json.texts) ? json.texts.filter((t: unknown) => typeof t === 'string') : [];
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Invalid JSON body. Expected { texts: string[] }' }) };
  }
  if (texts.length === 0) {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, embeddings: [] }) };
  }
  const MAX_TEXTS = 2000;
  if (texts.length > MAX_TEXTS) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: `Too many texts (max ${MAX_TEXTS})` }) };
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const BATCH = 20;
    const allEmbeddings: number[][] = [];
    for (let i = 0; i < texts.length; i += BATCH) {
      const batchTexts = texts.slice(i, i + BATCH);
      const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: batchTexts,
        config: { taskType: 'RETRIEVAL_DOCUMENT' },
      });
      const vectors = (response.embeddings || []).map((e: { values?: number[] }) => e.values || []);
      allEmbeddings.push(...vectors);
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, embeddings: allEmbeddings }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: String(err && (err as Error).message) }) };
  }
};
