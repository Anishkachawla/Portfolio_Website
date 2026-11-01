# Anishka Chawla — Portfolio

React (JavaScript) + Tailwind CSS frontend, Node.js/Express backend, with an AI chatbot that answers
questions about me. This is a **separate project** from the `My_Chatbot` repo: the chatbot's logic
(Gemini + persona prompt built from `summary.txt` and the LinkedIn PDF text) is ported into
`server/chatbot.js`, so nothing needs to be copied from or linked to that repo at runtime.

```
portfolio/
├── client/                React + Vite + Tailwind CSS
│   ├── public/profile.jpg     your hero photo (replace to change it)
│   └── src/
│       ├── data/siteData.js   ALL page content lives here
│       └── components/        Hero, Projects, Experience, Skills, Contact, ChatWidget...
├── server/                Node + Express
│   ├── index.js               /api/chat, /api/contact, /api/health, serves the built client
│   ├── chatbot.js             Gemini chatbot (port of My_Chatbot)
│   ├── data/                  chatbot knowledge: summary.txt, linkedin.txt, resume.txt
│   └── .env.example
└── package.json           root scripts (dev / build / start)
```

## External APIs, services and websites used

| What | Why | Needed? |
|---|---|---|
| **Google Gemini API** (`generativelanguage.googleapis.com`, OpenAI-compatible endpoint, model `gemini-2.5-flash`) | Powers the chatbot, same as your `My_Chatbot` | Yes, for the chatbot. Free key from [Google AI Studio](https://aistudio.google.com/apikey) |
| **Google Fonts** (Inter + Instrument Serif) | Typography that matches the reference style | Loaded from the browser; falls back to system fonts if blocked |
| **SMTP server** (e.g. Gmail) | Optional: emails you contact-form messages | No. Without it, messages are saved to `server/data/messages.jsonl` |
| **GitHub / LinkedIn** | Plain outbound links in the hero and contact section | No API used |
| **npm registry** | Installing dependencies | Setup only |

No other third-party APIs, CDNs or tracking scripts. Icons come from the `lucide-react` npm package
(bundled, no external requests). Hero photo and everything else are local files.

## Setup

**Prerequisites:** Node.js 18 or newer (`node -v`), npm.

```bash
# 1. unzip, then from the project root:
cd portfolio
npm run install:all          # installs root, client and server dependencies

# 2. configure the server
cp server/.env.example server/.env
# open server/.env and set GOOGLE_API_KEY=<your Google AI Studio key>
```

### Run in development (hot reload)

```bash
npm run dev
```

- Website: http://localhost:5173 (Vite; proxies `/api` to the server)
- API: http://localhost:5000

### Run as production (single server)

```bash
npm run build                # builds client/dist
npm start                    # Express serves the site AND the API on http://localhost:5000
```

## Deploying

The Express server serves the built React app, so you deploy **one** Node service
(Render, Railway, Fly.io, a VPS...):

- Build command: `npm run install:all && npm run build`
- Start command: `npm start`
- Environment variables: `GOOGLE_API_KEY` (required), plus optional `SMTP_*`, `CONTACT_TO`.

Notes:
- Vercel/Netlify static hosting alone won't work, because the chatbot needs the Node server and your API key.
  If you split the frontend from the backend, set `CLIENT_ORIGIN` on the server and point the client's `/api`
  calls at the backend URL.
- On hosts with ephemeral disks, `messages.jsonl` can be wiped on redeploy. Use SMTP in production.

## Security notes

- Your Gemini key stays on the server and is never sent to the browser. Never commit `server/.env`
  (it is in `.gitignore`).
- `/api/chat` is rate limited (12 requests/min per IP), limits message and history size, and only accepts
  `user`/`assistant` roles from the client, so visitors can't inject system prompts.
- `/api/contact` is rate limited (5/hour per IP), validated, and has a honeypot field against bots.
- Remember that anyone can use your chatbot, so keep an eye on your Gemini quota.

## Troubleshooting

- **Chat says "not configured yet":** `GOOGLE_API_KEY` is missing in `server/.env`; restart the server.
  `http://localhost:5000/api/health` shows `"chatbot": true` when the key is loaded.
- **Chat says it couldn't reach the AI service:** check the key is valid and the server log (`[chat] Gemini API ...`).
- **`/api` calls fail in dev:** make sure the server is running on port 5000 (or change the proxy in `client/vite.config.js`).
- **Port in use:** set `PORT` in `server/.env` and update the proxy target in `client/vite.config.js`.

## Git (separate repo)

```bash
cd portfolio
git init && git add . && git commit -m "Initial portfolio"
# create a NEW empty repo on GitHub (not My_Chatbot), then:
git remote add origin https://github.com/Anishkachawla/<new-repo>.git
git branch -M main && git push -u origin main
```
