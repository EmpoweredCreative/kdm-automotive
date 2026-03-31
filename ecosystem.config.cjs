/**
 * PM2 config for the SendGrid quote API (`server/index.mjs`).
 * Run from the deployed site root (Forge `current` symlink), e.g.:
 *   cd /home/forge/your-site.com/current && pm2 start ecosystem.config.cjs
 * After deploys: pm2 reload ecosystem.config.cjs --update-env
 */
module.exports = {
  apps: [
    {
      name: 'kdm-quote-api',
      script: 'server/index.mjs',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: '8787',
        BIND_HOST: '127.0.0.1',
      },
    },
  ],
}
