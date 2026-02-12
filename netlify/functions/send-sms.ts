const headers = { 'Content-Type': 'application/json' };

export const handler = async (event: { httpMethod: string; body?: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const defaultTo = process.env.TWILIO_TO?.trim();
  const basicAuthKey = authToken?.trim();

  if (!accountSid || !basicAuthKey || !from) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'Twilio not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM (and TWILIO_TO if not sending to a list).',
      }),
    };
  }

  let smsBody = 'Hello! This is a test SMS from Twilio.';
  let toNumbers: string[] = [];
  try {
    const json = event.body ? JSON.parse(event.body) : {};
    if (typeof json.body === 'string' && json.body.trim()) {
      smsBody = json.body.trim().slice(0, 1600);
    }
    if (Array.isArray(json.to) && json.to.length > 0) {
      toNumbers = json.to.filter((t: unknown) => typeof t === 'string' && (t as string).trim());
    }
  } catch {
    // use defaults
  }

  const recipients = toNumbers.length > 0 ? toNumbers : (defaultTo ? [defaultTo] : []);
  if (recipients.length === 0) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'No recipients. Provide body.to (array of phone numbers) or set TWILIO_TO in environment.',
      }),
    };
  }

  const results: { to: string; ok: boolean; sid?: string; error?: string }[] = [];
  for (const to of recipients) {
    const params = new URLSearchParams({
      From: from,
      To: to.trim(),
      Body: smsBody,
    });
    try {
      const twilioRes = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authToken}`,
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

  const allOk = results.every((r) => r.ok);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      ok: allOk,
      sent: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
      results,
    }),
  };
};
