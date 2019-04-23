const withTypescript = require("@zeit/next-typescript");
const withCss = require("@zeit/next-css");
const path = require("path");

// fix: prevents error when .css files are required by node
if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withTypescript(
  withCss({
    webpack(config, options) {
      config.resolve.alias = {
        ...config.resolve.alias,
        components: path.join(__dirname, "./components"),
        api: path.join(__dirname, "./api")
      };
      return config;
    }
  })
);
