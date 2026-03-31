# Forge deploy

- **Web directory:** `/dist`
- Deploy: `npm ci` → `npm run build` → activate release.

## SendGrid (quote form)

SendGrid’s **API is only HTTPS** (`api.sendgrid.com`); you don’t configure a port with them.

The **`PORT` (e.g. 8787)** is only for **our** small Node app on the server (`server/index.mjs`). It listens on **localhost** so **nginx** can forward `/api` to it — visitors still use **443** in the browser. The app then calls SendGrid with your API key.

The form POSTs to **`/api/quote`** on your domain.

1. **Environment** (Forge → Site → Environment): `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_TO_EMAIL` (see `.env.example`). Forge links this into each release; PM2 must see these (reload after env changes).

2. **Run the API process (required — nginx does not start Node for you).**  
   If `curl http://127.0.0.1:8787/api/health` fails with **no output**, nothing is listening yet.

   **Option A — PM2 (recommended)** — SSH as `forge`, then (replace the path with your site):

   ```bash
   cd /home/forge/getbumper2bumper.com/current
   npm install -g pm2
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```

   Run the **`sudo ...`** line `pm2 startup` prints once so PM2 survives reboots.

   After each deploy: `cd .../current && pm2 reload ecosystem.config.cjs --update-env`

   **Option B — Forge Daemon** — Server → Daemons → New daemon:

   - **Command:** `node server/index.mjs`
   - **Directory:** your site `current` path (same folder as `package.json`)
   - **User:** `forge`

   Ensure **Site → Environment** has the SendGrid variables; Forge injects them for daemons tied to the site when configured that way, or rely on the linked `.env` in `current`.

3. **Nginx:** see **`deploy/nginx-api-proxy.snippet.conf`** or **`deploy/nginx-forge-paste.conf`** — add **`location /api/`** before **`location /`**, and use **`try_files $uri $uri/ /index.html`** for the SPA.

Local: `.env` from `.env.example`, then **`npm run dev`**.

## If the browser shows **502** on `/api/quote`

**502 from nginx** usually means nothing is answering on `127.0.0.1:8787`, or the process crashed.

SSH in and run (use **`-v`** once — `curl -s` hides “Connection refused”):

```bash
curl -v http://127.0.0.1:8787/api/health
```

- **Connection refused** / empty with `-s` → **nothing is running on 8787.** Start the API (see **step 2** above: PM2 or Forge Daemon). Deploy + nginx alone are not enough.
- **Failed** in Forge “Run command” with **no output** → same as refused; Forge often marks non‑zero exit as failed.
- **`{"ok":true}`** → Node is up; if the site still errors, check `pm2 logs kdm-quote-api` while submitting the form (SendGrid errors appear there).

After changing Forge **Environment** variables, run **`pm2 reload kdm-quote-api --update-env`** (or restart the daemon) so Node picks them up.
