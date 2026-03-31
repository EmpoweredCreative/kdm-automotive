/** PM2: `cd /path/to/current && pm2 start ecosystem.config.cjs` */
module.exports = {
  apps: [
    {
      name: 'kdm-quote-api',
      script: 'server/index.mjs',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: '8787',
        BIND_HOST: '127.0.0.1',
      },
    },
  ],
}
