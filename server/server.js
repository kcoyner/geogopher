const express = require('express');
const webpack = require('webpack');
const path = require('path');
const bodyParser = require('body-parser')
const webpackDevMiddleware = require('webpack-dev-middleware');
const moment = require('moment');

const app = express();
const config = require('../webpack.dev.js');
const db = require('../db/config');
const compiler = webpack(config);
const apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(express.static('../dist'));
app.use('/api', apiRouter);

// Declare api routes BEFORE * route
apiRouter.route('/user')
  .post((req, res) => {
    let date = moment();
    // This should probably be put into some sort of helper file
    let user = {
      'username': req.body.username,
      'first_name': req.body.firstName,
      'last_name': req.body.lastName,
      'email': req.body.email,
      'password_hash': 'asldjasldkjas',
      'password_salt': 'sdf98SDF98+sdf1',
      'count_games_played': 0,
      'is_first_login': 't',
      'last_login': date,
      'user_ip': '1.127.23.34',
      'token':'4bDac45deUys'
    };
    db.users.create(user)
    .then(user => {
      res.send(user);
    })
  });

apiRouter.route('/gamelist')
  .get((req, res) => {
    db.games.findAll()
      .then(game => {
      console.log(game);
      res.send(game);
    })
  });

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});

app.listen(1337, function() {
  console.log('😎 listening on 1337');
});
