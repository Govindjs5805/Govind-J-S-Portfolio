const sg = require('@sendgrid/mail');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.TO_EMAIL || !process.env.FROM_EMAIL) {
    console.error('Missing SendGrid or email env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  sg.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sg.send({
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Website contact from ${name || email}`,
      text: `${message}\n\nFrom: ${name || ''} <${email}>`,
      html: `<p>${message}</p><p>From: ${name || ''} &lt;${email}&gt;</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SendGrid send error:', err);
    return res.status(500).json({ error: 'Send failed' });
  }
};
