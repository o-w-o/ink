const {
  override,
  addBundleVisualizer,
  addPostcssPlugins,
  addWebpackAlias,
} = require("customize-cra");
const { compose } = require("react-app-rewired");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // console.debug("env ->", env);
    // console.log("config ->", config);

    return override(
      addWebpackAlias({
        "@o-w-o/stores": path.resolve(__dirname, "src/store/modules"),
        "@o-w-o/templates": path.resolve(__dirname, "src/template/modules"),
        "@o-w-o/views": path.resolve(__dirname, "src/view/modules"),
      }),
      addPostcssPlugins([
        postcssPresetEnv({
          stage: 2,
          features: {
            "nesting-rules": true,
          },
          browsers: "last 2 versions",
        }),
      ]),
      process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer()
    )(config, env);
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function (config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    if (!config.testPathIgnorePatterns) {
      config.testPathIgnorePatterns = [];
    }
    if (!process.env.RUN_COMPONENT_TESTS) {
      config.testPathIgnorePatterns.push(
        "<rootDir>/src/components/**/*.test.js"
      );
    }
    if (!process.env.RUN_REDUCER_TESTS) {
      config.testPathIgnorePatterns.push("<rootDir>/src/reducers/**/*.test.js");
    }
    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(
        {
          "/api": {
            target: "http://localhost:8080",
            pathRewrite: {
              "^/api": "",
            },
            changeOrigin: true,
          },
        },
        allowedHost
      );

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      // const fs = require("fs");
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, "utf8"),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, "utf8"),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, "utf8"),
      //   passphrase: process.env.REACT_HTTPS_PASS,
      // };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function (paths, env) {
    console.debug("paths ->", paths);

    return Object.assign(paths, {
      appBuild: path.join(__dirname, "dist/public"),
    });
  },
};
