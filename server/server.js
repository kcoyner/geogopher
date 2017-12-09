const express = require('express');
const webpack = require('webpack');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const webpackDevMiddleware = require('webpack-dev-middleware');

const moment = require('moment');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv').config();

const app = express();
const config = require('../webpack.dev.js');
const compiler = webpack(config);
const apiRouter = express.Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const db = require('../db/config');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('../dist'));

app.use('/api', apiRouter);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:1337/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
    //  db.users.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    return done(err, user);
    //  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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
      'token': '4bDac45deUys'
    };
    db.users.create(user)
    .then(user => {
      res.send(user);
    })
  });

apiRouter.route('/gameslist')
  .get(cors(corsOptions), (req, res) => {
    db.games.findAll({
      attributes: ['game_name']
    })
      .then(games => {
      // console.log(games);
      res.send(games);
    })
});

app.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});

app.listen(1337, function() {
  console.log('😎 listening on 1337');
});
