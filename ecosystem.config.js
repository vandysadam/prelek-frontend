module.exports = {
  apps: [
    {
      exec_mode: 'cluster',
      script: 'serve',
      watch: true,
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 3004,
        PM2_SERVE_SPA: 'true'
      },
      instances: '2',
      name: 'backoffice.contag.id'
    },
    {
      script: 'serve',
      watch: true,
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 4004,
        PM2_SERVE_SPA: 'true'
      },
      name: 'staging-backoffice.contag.id'
    }
  ]
};
