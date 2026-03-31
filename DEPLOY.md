# Laravel Forge (static Vite site)

## Directories (Site → Meta)

| Field | Value |
|--------|--------|
| **Root directory** | `/` |
| **Web directory** | `/dist` |

Do **not** use `/public` — that folder only has static assets (favicon, etc.). The built site (including `index.html`) is in **`dist`** after `npm run build`.

## Deployment script (Site → Deploy)

Put this **between** `cd $FORGE_RELEASE_DIRECTORY` and `$ACTIVATE_RELEASE()` so each release installs dependencies and builds `dist`:

```bash
$CREATE_RELEASE()

cd $FORGE_RELEASE_DIRECTORY

npm ci
npm run build

$ACTIVATE_RELEASE()
```

- Enable **Node.js** on the server (Forge → Server → Node) and pick an LTS version (e.g. 20 or 22).
- `dist` is gitignored; it only exists after `npm run build` on the server.

## Nginx (SPA)

Ensure the site config uses a single-page app fallback, e.g.:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

(Edit under Site → Nginx in Forge if needed.)

## Quote form API (SendGrid)

The contact form posts to **`/api/quote`**. The static build in **`dist/`** does not include that route. You must run the Node server and **proxy `/api` in Nginx**; otherwise submissions fail (often with a generic error in the UI).

### 1. Environment variables (Forge → Site → Environment)

Set at least:

- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL` (verified sender in SendGrid)
- `SENDGRID_TO_EMAIL` (where quote emails go)

Optional: `SENDGRID_SUBJECT`, `SENDGRID_SENDER_NAME`, `PORT` (default `8787`).

### 2. Nginx: proxy `/api` to Node

Edit the site config (Forge → Site → Nginx). Add the snippet from **`deploy/nginx-api-proxy.snippet.conf`** *above* your SPA `location / { try_files ... }` block so `/api/*` is handled before the SPA fallback.

Deploy / reload Nginx after saving.

### 3. Run the API with PM2

From the server, using your real site path (the `current` release symlink):

```bash
cd /home/forge/your-site.com/current
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup   # follow the printed command once so PM2 restarts after reboot
```

After each deploy, reload the process so it uses the new release:

```bash
cd /home/forge/your-site.com/current && pm2 reload ecosystem.config.cjs --update-env
```

You can add that as an extra line at the **end** of the Forge deploy script (after `$ACTIVATE_RELEASE()`).

### 4. Verify

```bash
curl -s http://127.0.0.1:8787/api/health
curl -s -o /dev/null -w "%{http_code}" https://your-domain.com/api/health
```

Expect JSON `{"ok":true}` and HTTP **200**.
