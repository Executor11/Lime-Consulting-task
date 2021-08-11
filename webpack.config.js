const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: true,
  },
  entry: "./src/assets/scripts/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist/assets/js"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
