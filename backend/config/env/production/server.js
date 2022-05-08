module.exports = ({ env }) => ({
  proxy: true,
  url: env("https://gentle-harbor-08583.herokuapp.com"),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
