# Laravel Forge (static Vite site)

| Field | Value |
|--------|--------|
| **Web directory** | `/dist` |

Deploy script (between `cd $FORGE_RELEASE_DIRECTORY` and `$ACTIVATE_RELEASE()`):

```bash
npm ci
npm run build
```

Enable Node on the server for the build step. `dist` is produced by `npm run build` and is gitignored.

## SPA (Nginx)

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Quote form (FormSubmit)

The form POSTs to **FormSubmit** ([formsubmit.co](https://formsubmit.co)) using `CONTACT_FORM_ACTION` in [`src/constants/site.ts`](src/constants/site.ts). **No Node, nginx `/api` proxy, PM2, or SendGrid** on the server.

The first real submission sends a **one-time activation email** to that inbox — click the link once.

### If you added `/api/` or PM2 earlier (cleanup)

- Remove the **`location /api/`** block from Nginx (only `location /` + SPA fallback is needed).
- Stop and remove the old process: `pm2 delete kdm-quote-api` (or your daemon name) if it was running.

No env vars are required for the form.
