module.exports = {
  apps: [
    {
      name: "mzeeshanme",
      script: "yarn start",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
