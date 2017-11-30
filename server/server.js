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
app.use('/api', apiRouter);

// Declare api routes BEFORE * route
apiRouter.route('/user')
.post((req, res) => {
  res.send('hello');
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});

app.listen(1337, function() {
  console.log('😎 listening on 1337');
});

// db.users.findAll().then(users => {
//   console.log('users: ', users);
// });
