module.exports = ({ env }) => ({
  proxy: true,
  url: env("https://artbyhargreaves.herokuapp.com"),
  /*   app: {
    keys: env.array("APP_KEYS"),
  }, */
});
