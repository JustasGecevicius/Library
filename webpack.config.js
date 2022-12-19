const path = require("path");

module.exports = {
  entry: "./src/script.js",
  mode: "development",
  cache:false,
  output: {
    filename: "main.js",
    publicPath: "/Library/",
  },
};
