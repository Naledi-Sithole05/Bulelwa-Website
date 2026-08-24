const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Swap this for your actual GitHub Pages URL once deployed
  // (e.g. 'https://yourusername.github.io')
  res.setHeader('Access-Control-Allow-Origin', 'https://YOUR-GITHUB-PAGES-DOMAIN');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, type, date, organization, message, honey } = req.body;

  // Honeypot — bots fill this field in, real visitors never see it
  if (honey) return res.status(200).json({ success: true });

  if (!name || !email || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Booking Form" <${process.env.GMAIL_USER}>`,
      to: 'bulelwamashezi@gmail.com',
      replyTo: email,
      subject: `New Booking Request — ${type}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || '—'}
Booking Type: ${type}
Preferred Date: ${date || '—'}
Organization/Location: ${organization || '—'}

Event Details:
${message || '—'}
      `,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};