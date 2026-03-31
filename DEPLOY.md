# Laravel Forge (static Vite site)

| Field | Value |
|--------|--------|
| **Web directory** | `/dist` |

```bash
npm ci
npm run build
```

## Quote form (Web3Forms)

Submissions use **[Web3Forms](https://web3forms.com)** (`POST` to `api.web3forms.com` from the browser). This avoids relying on **FormSubmit** (`formsubmit.co`), which can show Cloudflare errors when their origin is down.

1. Create a free form at [web3forms.com](https://web3forms.com) and copy the **Access Key**.
2. Set the **notification email** in the Web3Forms dashboard (e.g. `danny@empoweredcreative.co` or the business inbox).
3. In Forge → **Site → Environment**, add **`VITE_WEB3FORMS_ACCESS_KEY=your_key`** so it is available when **`npm run build`** runs (Vite embeds `VITE_*` at build time).
4. Add your **live domain** under Web3Forms domain restrictions if they offer it.

Local: copy `.env.example` to `.env`, set the key, run **`npm run dev`**.

## SPA (Nginx)

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### If you previously added `/api/` or PM2

You can remove **`location /api/`** and stop **`pm2 delete kdm-quote-api`** — not used for Web3Forms.
