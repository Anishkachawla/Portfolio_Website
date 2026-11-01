import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chat, ChatConfigError } from './chatbot.js';
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.use(express.json({ limit: '50kb' }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(',').map((s) => s.trim())
      : true,
  })
);

const chatLimiter = rateLimit({
  windowMs: 60_000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please wait a minute and try again.' },
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60_000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
});

app.get('/api/health', (_req, res) =>
  res.json({ ok: true, chatbot: Boolean(process.env.GOOGLE_API_KEY) })
);

// ---- Chatbot -------------------------------------------------------------
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { message, history } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  try {
    const reply = await chat(message.trim(), history);
    res.json({ reply });
  } catch (err) {
    console.error('[chat]', err.message);
    if (err instanceof ChatConfigError) {
      return res
        .status(503)
        .json({ error: 'The chatbot is not configured yet. Please use the contact form.' });
    }
    res.status(502).json({ error: "Sorry, I couldn't reach the AI service. Please try again." });
  }
});

// ---- Contact form --------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function deliver({ name, email, message }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Must use this exact address on the free tier
      to: process.env.CONTACT_TO,                // Your email (must match your Resend account email)
      reply_to: email,                           // The visitor's email, so you can reply to them
      subject: `Portfolio message from ${name}`,
      text: message
    });
    if (error) {
      console.error('[contact] Resend API Error:', error);
      return false;
    }
    console.log('[contact] Email sent successfully:', data.id);
    return true;
  } catch (error) {
    console.error('[contact] Unexpected error sending email:', error);
    return false;
  }
  // 2) Otherwise store locally so nothing is lost
  const dir = path.join(__dirname, 'data');
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(
    path.join(dir, 'messages.jsonl'),
    JSON.stringify({ at: new Date().toISOString(), name, email, message }) + '\n'
  );
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot: bots fill this hidden field
  if (
    typeof name !== 'string' || !name.trim() || name.length > 100 ||
    typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 200 ||
    typeof message !== 'string' || message.trim().length < 5 || message.length > 3000
  ) {
    return res.status(400).json({ error: 'Please fill in a valid name, email and message.' });
  }
  try {
    await deliver({ name: name.trim(), email: email.trim(), message: message.trim() });
    res.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err.message);
    res.status(500).json({ error: 'Could not send your message. Please email me directly.' });
  }
});

// ---- Serve the built React app in production ------------------------------
const distDir = path.join(__dirname, '..', 'client', 'dist');
if (isProd || fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api\/).*/, (_req, res, next) => {
    const index = path.join(distDir, 'index.html');
    fs.existsSync(index) ? res.sendFile(index) : next();
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (!process.env.GOOGLE_API_KEY) {
    console.warn('! GOOGLE_API_KEY missing: /api/chat will return 503 until you set it.');
  }
});
