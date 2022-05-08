module.exports = ({ env }) => ({
  proxy: true,
  url: env("https://enigmatic-plateau-23532.herokuapp.com/"),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
