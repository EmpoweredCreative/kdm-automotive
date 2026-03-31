# Laravel Forge (static Vite site)

## Directories (Site → Meta)

| Field | Value |
|--------|--------|
| **Root directory** | `/` |
| **Web directory** | `/dist` |

Do **not** use `/public` — that folder only has static assets (favicon, etc.). The built site (including `index.html`) is in **`dist`** after `npm run build`.

## Quote form (no nginx, no Node API)

The contact form submits via **Web3Forms** when **`VITE_WEB3FORMS_ACCESS_KEY`** is set at **build time**. No reverse proxy or PM2 is required.

1. Create a free access key at [web3forms.com](https://web3forms.com).
2. In Forge → **Site → Environment**, add:
   - `VITE_WEB3FORMS_ACCESS_KEY=your_key_here`
3. Deploy so `npm run build` runs with that variable available (Forge injects env into the deploy environment).

Submissions are emailed to the address you configure in the Web3Forms dashboard.

## Deployment script (Site → Deploy)

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

## Local development

Use **`npm run dev`**. If **`VITE_WEB3FORMS_ACCESS_KEY`** is unset, the form posts to **`/api/quote`** (Express + SendGrid). Copy `.env.example` to `.env` and fill SendGrid vars. See `server/index.mjs`.
