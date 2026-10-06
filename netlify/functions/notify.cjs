const https = require('https');

function escapeHTML(str) {
  if (!str) return 'N/A';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

exports.handler = async (event, context) => {
  // 1. Accept POST only
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' })
    };
  }

  // 2. Read environment variables
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Server configuration error' })
    };
  }

  // 3. Parse and validate body
  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Invalid JSON body' })
    };
  }

  // Honeypot check: reject if hidden "website" honeypot field is filled
  if (body.website && String(body.website).trim().length > 0) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true })
    };
  }

  // Extract fields
  const name = String(body.name || '').trim();
  const businessName = String(body.businessName || '').trim();
  const phoneWhatsapp = String(body.phoneWhatsapp || '').trim();
  const email = String(body.email || '').trim();
  const categorySlug = String(body.categorySlug || 'General Business').trim();
  const templateSlug = String(body.templateSlug || 'None selected').trim();
  const serviceNeeds = Array.isArray(body.serviceNeeds) ? body.serviceNeeds.join(', ') : String(body.serviceNeeds || 'N/A');
  const additionalDetails = String(body.additionalDetails || 'None').trim();

  // Basic field presence validation
  if (!name || !businessName || !phoneWhatsapp || !email) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Missing required fields' })
    };
  }

  // Length checks (max 1000 chars each)
  if (
    name.length > 1000 ||
    businessName.length > 1000 ||
    phoneWhatsapp.length > 1000 ||
    email.length > 1000 ||
    additionalDetails.length > 1000
  ) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Input field exceeds maximum allowed length' })
    };
  }

  // Format clean WhatsApp URL for applicant's phone
  const rawDigits = phoneWhatsapp.replace(/\D/g, '');
  const applicantWaUrl = rawDigits ? `https://wa.me/${rawDigits}` : 'N/A';

  // Format current timestamp in Africa/Lagos timezone
  let lagosTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' });

  // Escape HTML inputs for safe Telegram formatting
  const escapedName = escapeHTML(name);
  const escapedBusiness = escapeHTML(businessName);
  const escapedCategory = escapeHTML(categorySlug);
  const escapedPhone = escapeHTML(phoneWhatsapp);
  const escapedEmail = escapeHTML(email);
  const escapedTemplate = escapeHTML(templateSlug);
  const escapedNeeds = escapeHTML(serviceNeeds);
  const escapedNotes = escapeHTML(additionalDetails);

  // Format HTML message for Telegram
  const messageText = `<b>New Website Request</b>\n\n` +
    `<b>Name:</b> ${escapedName}\n` +
    `<b>Business:</b> ${escapedBusiness}\n` +
    `<b>Category:</b> ${escapedCategory}\n` +
    `<b>Phone:</b> ${escapedPhone}\n` +
    `<b>WhatsApp Link:</b> <a href="${applicantWaUrl}">${applicantWaUrl}</a>\n` +
    `<b>Email:</b> ${escapedEmail}\n` +
    `<b>Package / Concept Chosen:</b> ${escapedTemplate}\n` +
    `<b>Services Needed:</b> ${escapedNeeds}\n` +
    `<b>Notes:</b> ${escapedNotes}\n` +
    `<b>Time (Africa/Lagos):</b> ${escapeHTML(lagosTime)}`;

  // Send request to Telegram bot API
  const postData = JSON.stringify({
    chat_id: chatId,
    text: messageText,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  });

  try {
    const telegramRes = await new Promise((resolve, reject) => {
      const req = https.request(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, body: data });
          });
        }
      );

      req.on('error', (err) => reject(err));
      req.write(postData);
      req.end();
    });

    if (telegramRes.statusCode >= 200 && telegramRes.statusCode < 300) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: true })
      };
    } else {
      console.error('Telegram API error status:', telegramRes.statusCode, telegramRes.body);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, error: 'Failed to dispatch notification' })
      };
    }
  } catch (err) {
    console.error('Error contacting Telegram API:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Internal server error' })
    };
  }
};
