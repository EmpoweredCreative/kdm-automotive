# Forge deploy

- **Web directory:** `/dist`
- Deploy: `npm ci` → `npm run build` → activate release.

## SendGrid (quote form)

SendGrid’s **API is only HTTPS** (`api.sendgrid.com`); you don’t configure a port with them.

The **`PORT` (e.g. 8787)** is only for **our** small Node app on the server (`server/index.mjs`). It listens on **localhost** so **nginx** can forward `/api` to it — visitors still use **443** in the browser. The app then calls SendGrid with your API key.

The form POSTs to **`/api/quote`** on your domain.

1. **Environment** (Forge → Site → Environment): `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_TO_EMAIL` (see `.env.example`). Forge links this into each release; PM2 must see these (reload after env changes).

2. **Daemon:** from the site `current` directory: `pm2 start ecosystem.config.cjs`. After deploy: `pm2 reload ecosystem.config.cjs --update-env`.

3. **Nginx:** see **`deploy/nginx-api-proxy.snippet.conf`** — add **`location /api/`** before **`location /`**, and use **`try_files $uri $uri/ /index.html`** for the SPA (not `=404`).

Local: `.env` from `.env.example`, then **`npm run dev`**.
