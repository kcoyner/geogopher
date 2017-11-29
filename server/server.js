const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../webpack.dev.js');
const db = require('../db/config');
const compiler = webpack(config);

const apiRouter = express.Router();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static('../dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});

app.listen(1337, function() {
  console.log('😎 listening on 1337');
});

app.use('/api', apiRouter);

db.users.findAll().then(users => {
  console.log('users: ', users);
});

apiRouter.route('/map')
  .get((req, res) => {
    res.send('hello');
  });
