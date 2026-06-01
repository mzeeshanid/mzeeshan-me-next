module.exports = {
  apps: [
    {
      name: "mzeeshanme",
      script: "node_modules/.bin/next",
      args: "start",
      instances: 2,
      exec_mode: "cluster",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
