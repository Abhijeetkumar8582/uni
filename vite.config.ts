import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const twilioAccountSid = env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = env.TWILIO_AUTH_TOKEN;
    const twilioFrom = env.TWILIO_FROM;
    const twilioTo = env.TWILIO_TO;
    const geminiApiKey = env.GEMINI_API_KEY;

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'api-embed',
          configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
              if (req.url !== '/api/embed' || req.method !== 'POST') {
                return next();
              }
              let body = '';
              req.on('data', (chunk) => { body += chunk; });
              req.on('end', async () => {
                res.setHeader('Content-Type', 'application/json');
                if (!geminiApiKey?.trim()) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ ok: false, error: 'GEMINI_API_KEY not set in .env.local' }));
                  return;
                }
                let texts: string[] = [];
                try {
                  const json = body ? JSON.parse(body) : {};
                  texts = Array.isArray(json.texts) ? json.texts.filter((t: unknown) => typeof t === 'string') : [];
                } catch (_) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ ok: false, error: 'Invalid JSON body. Expected { texts: string[] }' }));
                  return;
                }
                if (texts.length === 0) {
                  res.statusCode = 200;
                  res.end(JSON.stringify({ ok: true, embeddings: [] }));
                  return;
                }
                const MAX_TEXTS = 2000;
                if (texts.length > MAX_TEXTS) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ ok: false, error: `Too many texts (max ${MAX_TEXTS})` }));
                  return;
                }
                try {
                  const { GoogleGenAI } = await import('@google/genai');
                  const ai = new GoogleGenAI({ apiKey: geminiApiKey });
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
                  res.statusCode = 200;
                  res.end(JSON.stringify({ ok: true, embeddings: allEmbeddings }));
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ ok: false, error: String(err && (err as Error).message) }));
                }
              });
            });
          },
        },
        {
          name: 'twilio-send-sms',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url !== '/api/send-sms' || req.method !== 'POST') {
                return next();
              }
              let body = '';
              req.on('data', (chunk) => { body += chunk; });
              req.on('end', async () => {
                let smsBody = 'Hello! This is a test SMS from Twilio.';
                let toNumbers: string[] = [];
                try {
                  const json = body ? JSON.parse(body) : {};
                  if (typeof json.body === 'string' && json.body.trim()) {
                    smsBody = json.body.trim().slice(0, 1600);
                  }
                  if (Array.isArray(json.to) && json.to.length > 0) {
                    toNumbers = json.to.filter((t: unknown) => typeof t === 'string' && t.trim());
                  }
                } catch (_) {}
                const basicAuthKey = twilioAuthToken?.trim();
                if (!twilioAccountSid || !basicAuthKey || !twilioFrom) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ ok: false, error: 'Twilio not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM (and TWILIO_TO if not sending to a list).' }));
                  return;
                }
                const recipients = toNumbers.length > 0 ? toNumbers : (twilioTo?.trim() ? [twilioTo.trim()] : []);
                if (recipients.length === 0) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 400;
                  res.end(JSON.stringify({ ok: false, error: 'No recipients. Provide body.to (array of phone numbers) or set TWILIO_TO in .env.local' }));
                  return;
                }
                const results: { to: string; ok: boolean; sid?: string; error?: string }[] = [];
                for (const to of recipients) {
                  const params = new URLSearchParams({
                    From: twilioFrom,
                    To: to.trim(),
                    Body: smsBody,
                  });
                  try {
                    const twilioRes = await fetch(
                      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          Authorization: `Basic ${basicAuthKey}`,
                        },
                        body: params.toString(),
                      }
                    );
                    const data = await twilioRes.json();
                    if (twilioRes.ok) {
                      results.push({ to, ok: true, sid: data.sid });
                    } else {
                      results.push({ to, ok: false, error: data.message || 'Twilio error' });
                    }
                  } catch (err) {
                    results.push({ to, ok: false, error: String(err && (err as Error).message) });
                  }
                }
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                const allOk = results.every(r => r.ok);
                res.end(JSON.stringify({
                  ok: allOk,
                  sent: results.filter(r => r.ok).length,
                  failed: results.filter(r => !r.ok).length,
                  results,
                }));
              });
            });
          },
        },
      ],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
