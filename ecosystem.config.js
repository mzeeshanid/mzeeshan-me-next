module.exports = {
  apps: [
    {
      name: "mzeeshanme",
      script: "yarn start",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
