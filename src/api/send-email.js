// ✅ FILE: /api/send-email.js (Place this in your React project root)

import nodemailer from 'nodemailer';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
    captchaToken,
  } = req.body;

  try {
    // ✅ 1. Verify reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`;
    const verifyRes = await axios.post(verifyURL);

    if (!verifyRes.data.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    // ✅ 2. Send Admin Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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
      `,
    });

    // ✅ 3. Send Confirmation to User
    await transporter.sendMail({
      from: `"Your Company" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We've received your message",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for reaching out to us. We'll get back to you shortly.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <p>Best,<br>Your Team</p>
      `,
    });

    // ✅ 4. Push to Google Sheets
    await axios.post(process.env.GOOGLE_SHEET_ENDPOINT, {
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
    });

    return res.status(200).json({ status: 'mail_sent' });
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
