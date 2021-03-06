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
        interfaces: path.join(__dirname, "./interfaces"),
        components: path.join(__dirname, "./components"),
        pages: path.join(__dirname, "./pages"),
        api: path.join(__dirname, "./api"),
        store: path.join(__dirname, "./store"),
        static: path.join(__dirname, "./static")
      };
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
      return config;
    }
  })
);
