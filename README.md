# Hariom Tiwari — AI Developer Portfolio

A premium, responsive Next.js portfolio for Hariom Tiwari, built with a dark developer aesthetic, verified profile content, and a secure AI assistant powered by the OpenAI server SDK.

## Features
- Responsive single-page portfolio with recruiter-friendly sections
- Verified profile info for Hariom Tiwari
- Premium dark UI with glassmorphism, gradient accents, and subtle motion
- AI assistant endpoint at `/api/chat` using server-side environment variables
- Resume section that handles missing PDF gracefully
- SEO metadata, favicon, and static generation hints for a clean start

## Requirements
- Node.js 20+
- npm
- OpenAI API key for live chatbot responses

## Local setup

```bash
npm install
npm run dev
```

Create a local environment file before using the AI assistant:

```bash
copy .env.example .env.local
```

Open `.env.local` and replace the placeholder with your real key:

```env
OPENAI_API_KEY=your_real_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Do not commit `.env.local` or expose the API key in frontend code.

## Run the project commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## AI configuration
- The app reads `OPENAI_API_KEY` and `OPENAI_MODEL` server-side only.
- For local development, store them in `.env.local`.
- For Vercel deployment, add them in Project Settings → Environment Variables.
- Keep the API key out of client-side JavaScript and source control.

## Resume setup
Place your verified PDF at:

```text
public/resume.pdf
```

If the file is missing, the site will show a clear development message instead of a broken download link.

## Project and contact updates
Update the main profile and links in the data file:

```text
data/profile.ts
```

Keep all project, contact, and profile information editable there so it stays easy to maintain.

## Security notes
The chat route validates request bodies, limits message count and length, and never logs the API key or sensitive prompt content. It does not implement a production-grade IP or distributed rate limiter; for public deployment, add a persistent limiter such as Upstash Redis or a provider-level rate limit.

## Deployment notes
1. Push this project to GitHub.
2. Import it into Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Redeploy after setting `OPENAI_API_KEY` and `OPENAI_MODEL`.

## Troubleshooting
- If the assistant returns a configuration message, add the OpenAI key to `.env.local` and restart the dev server.
- If the resume link is missing, add a real `public/resume.pdf` file.
- If linting reports issues, fix the code and rerun `npm run lint`.
- If a deployment-specific issue appears, verify the server environment variables in Vercel.

## Important note
This portfolio includes only verified information supplied for Hariom Tiwari. If something is unknown, the site does not invent it and the AI assistant will state that it does not have that information.
