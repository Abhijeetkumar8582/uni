/**
 * Embedding service: chunking and Gemini embeddings.
 * Uses /api/embed (Vite middleware) so the API key stays server-side.
 */

const EMBED_BATCH = 20;
/** Max chunks to avoid huge arrays (Invalid array length / memory). */
const MAX_CHUNKS = 2000;

/** Recursive character text splitter for RAG chunking. */
export function chunkText(
  text: string,
  chunkSize: number = 512,
  overlap: number = 50
): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  // Guard: overlap must be less than chunkSize so we always move forward
  const safeOverlap = Math.min(Math.max(0, overlap), Math.max(0, chunkSize - 1));

  const chunks: string[] = [];
  let start = 0;

  while (start < trimmed.length && chunks.length < MAX_CHUNKS) {
    let end = Math.min(start + chunkSize, trimmed.length);

    if (end < trimmed.length) {
      const lastSpace = trimmed.lastIndexOf(' ', end);
      if (lastSpace > start) {
        end = lastSpace + 1;
      }
    }

    const chunk = trimmed.slice(start, end).trim();
    if (chunk) chunks.push(chunk);

    // Never go backwards (avoids infinite loop and invalid state)
    start = Math.max(start + 1, end - safeOverlap);
    if (start >= trimmed.length) break;
  }

  return chunks;
}

/** Approximate token count (chars / 4). */
export function approxTokenCount(text: string): number {
  return Math.ceil((text.length || 0) / 4);
}

/** Cosine similarity between two vectors (0–1). */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : Math.max(0, Math.min(1, dot / denom));
}

/**
 * Get embeddings for texts via server /api/embed (Gemini gemini-embedding-001).
 * Returns array of embedding vectors in same order as input.
 */
export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const res = await fetch('/api/embed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts }),
  });

  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || 'Embedding request failed');
  }
  return data.embeddings || [];
}
