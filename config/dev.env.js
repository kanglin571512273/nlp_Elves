"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ADMIN_SERVER: '"/api"',

  // devServer: {
  //   host: "localhost",
  //   port: 10234,
  //   proxy: {
  //     "/api": {
  //       target: "http://192.168.1.27:8089/",
  //       changeOrigin: true
  //     }
  //   }
  // }
});
