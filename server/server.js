const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../webpack.dev.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static('../dist'));

app.listen(1337, function () {
  console.log('😎 listening on 1337')
})
