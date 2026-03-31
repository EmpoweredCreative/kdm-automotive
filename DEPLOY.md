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

The contact form posts to `/api/quote`. That is served by `server/index.mjs`, not by static files. After the site works, add a **daemon** (or PM2) running `npm run start` with env vars from `.env.example`, and proxy `/api` in Nginx to that process.
