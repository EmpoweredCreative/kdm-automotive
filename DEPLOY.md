# Forge deploy

- **Web directory:** `/dist`
- Deploy: `npm ci` → `npm run build` → activate release.

## SendGrid (quote form)

The form POSTs to **`/api/quote`**. SendGrid runs in **`server/index.mjs`** — the API key stays on the server.

1. **Environment** (Forge → Site → Environment): set `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL` (verified sender), `SENDGRID_TO_EMAIL` (inbox that receives leads). Same names as `.env.example`.

2. **Daemon:** run the API from `current`, e.g. `pm2 start ecosystem.config.cjs` (see `ecosystem.config.cjs`). After deploy: `pm2 reload ecosystem.config.cjs --update-env`.

3. **Nginx:** proxy `/api` to Node — paste **`deploy/nginx-api-proxy.snippet.conf`** above your SPA `location /` block.

Local: copy `.env.example` → `.env`, fill SendGrid, run **`npm run dev`**.
