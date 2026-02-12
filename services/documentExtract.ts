/**
 * Extract plain text from uploaded files (TXT, PDF).
 * PDF uses pdfjs-dist; TXT uses FileReader.
 * Worker is loaded from CDN so it works in all environments (avoids Vite worker path issues).
 */

export type ExtractResult = { text: string; error?: string };

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as ArrayBuffer);
    r.onerror = () => reject(new Error('Failed to read file'));
    r.readAsArrayBuffer(file);
  });
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve((r.result as string) || '');
    r.onerror = () => reject(new Error('Failed to read file'));
    r.readAsText(file, 'UTF-8');
  });
}

/** Extract text from a TXT file. */
export async function extractTxt(file: File): Promise<ExtractResult> {
  try {
    const text = await readFileAsText(file);
    return { text: text.trim() || '(empty file)' };
  } catch (e) {
    return { text: '', error: e instanceof Error ? e.message : 'Failed to read TXT' };
  }
}

// PDF.js worker: use CDN so it loads reliably (matches pdfjs-dist version in package.json)
const PDFJS_WORKER_VERSION = '5.4.624';
const PDFJS_WORKER_CDN = `https://unpkg.com/pdfjs-dist@${PDFJS_WORKER_VERSION}/build/pdf.worker.mjs`;

let pdfWorkerInitialized = false;

function ensurePdfWorker(pdfjsLib: { GlobalWorkerOptions: { workerSrc: string } }): void {
  if (pdfWorkerInitialized) return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
  pdfWorkerInitialized = true;
}

/** Extract text from a PDF file using pdfjs-dist. */
export async function extractPdf(file: File): Promise<ExtractResult> {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    ensurePdfWorker(pdfjsLib);

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const doc = await loadingTask.promise;
    const numPages = doc.numPages;
    // Limit pages to avoid freezing on huge PDFs (e.g. 100 max)
    const maxPages = Math.min(numPages, 100);
    const parts: string[] = [];

    for (let i = 1; i <= maxPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: unknown) => (item && typeof item === 'object' && 'str' in item ? (item as { str: string }).str : ''))
        .join(' ');
      if (pageText.trim()) parts.push(pageText.trim());
    }

    const text = parts.join('\n\n').trim();
    const truncatedNote = numPages > maxPages ? `\n\n[Truncated: only first ${maxPages} of ${numPages} pages extracted.]` : '';
    return { text: (text || '(no extractable text)') + truncatedNote };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to extract PDF text';
    return { text: '', error: message };
  }
}

const PDF_MIME = 'application/pdf';
const TXT_MIME = 'text/plain';

/** Extract text from file based on type. Supports .txt and .pdf. */
export async function extractTextFromFile(file: File): Promise<ExtractResult> {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const mime = file.type?.toLowerCase() || '';

  if (ext === 'pdf' || mime === PDF_MIME) {
    return extractPdf(file);
  }
  if (ext === 'txt' || mime.startsWith('text/')) {
    return extractTxt(file);
  }
  return { text: '', error: `Unsupported format: ${file.name}. Use .txt or .pdf.` };
}
