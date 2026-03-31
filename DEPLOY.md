# Laravel Forge (static Vite site)

| Field | Value |
|--------|--------|
| **Web directory** | `/dist` |

Deploy script (between `cd $FORGE_RELEASE_DIRECTORY` and `$ACTIVATE_RELEASE()`):

```bash
npm ci
npm run build
```

The contact form POSTs to **FormSubmit** (see `CONTACT_FORM_ACTION` in `src/constants/site.ts`). The first time someone submits, FormSubmit emails that inbox to **activate** the form — click the link once.
