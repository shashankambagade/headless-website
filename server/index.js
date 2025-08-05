const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const {
    name,
    email,
    subject,
    message,
    recipient,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    gclid,
    captchaToken, // ✅ NEW: get from frontend
  } = req.body;

  //console.log('📥 Received form data:', req.body);

  // ✅ 1. Validate reCAPTCHA
  if (!captchaToken) {
    return res.status(400).json({ status: 'captcha_missing' });
  }

  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captchaToken}`;
    const { data } = await axios.post(verifyURL);

    if (!data.success) {
      //console.warn('⚠️ reCAPTCHA failed:', data);
      return res.status(403).json({ status: 'captcha_failed', error: data });
    }

    // ✅ 2. Setup mail transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ 3. Send email to Admin
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: recipient,
      subject,
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <hr />
        <p><strong>UTM Source:</strong> ${utm_source || '-'}</p>
        <p><strong>UTM Medium:</strong> ${utm_medium || '-'}</p>
        <p><strong>UTM Campaign:</strong> ${utm_campaign || '-'}</p>
        <p><strong>UTM Term:</strong> ${utm_term || '-'}</p>
        <p><strong>UTM Content:</strong> ${utm_content || '-'}</p>
        <p><strong>gclid:</strong> ${gclid || '-'}</p>
      `,
    });

    // ✅ 4. Send confirmation to user
    await transporter.sendMail({
      from: `"Your Company" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We've received your message",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for reaching out to us. We've received your message and will get back to you shortly.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <p>Best regards,<br>Your Team</p>
      `,
    });

    // ✅ 5. Push to Google Sheets
    const sheetPayload = {
      name,
      email,
      subject,
      message,
      recipient,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
    };

   // console.log('📤 Payload to Google Sheets:', sheetPayload);

    await axios.post(
      'https://script.google.com/macros/s/AKfycbwNBxr8hpprX2dL4MZ_qW-6axmuJDuKHjtE08Fn3f61rEcYP-5v-TXKbJjb0QKc6yZ-/exec',
      sheetPayload
    );

    res.status(200).json({ status: 'mail_sent' });
  } catch (error) {
   // console.error('❌ Email error:', error);
    res.status(500).json({ status: 'error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));