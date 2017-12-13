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
  let date = moment();
  db.users
  .findOrCreate({where: {google_id: profile.id}, defaults: {
    'google_id': profile.id,
    'first_name': profile.name.givenName,
    'last_name': profile.name.familyName,
    'count_games_played': 0,
    'last_login': date,
    'email': profile.emails[0].value
  }})
  .spread((user, created) => {
    user.created = created;
    return done(null, user);
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user.google_id);
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
      'first_name': req.body.firstName,
      'last_name': req.body.lastName,
      'email': req.body.email,
      'count_games_played': 0,
      'last_login': date
    };
    db.users.create(user)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      console.log(error);
    })
  });

apiRouter.route('/gameslist')
  .get(cors(corsOptions), (req, res) => {
    db.games.findAll({
      attributes: ['game_name']
    })
      .then(games => {
      res.send(games);
    })
});

apiRouter.route('/user')
  .get((req, res) => {
    // let query = {};
    // if(req.query.google) {
    //   query.google_id = req.query.id;
    // } else {
    //   query.id = req.query.id;
    // }
    let date = moment();
    db.users
    .findOrCreate({where: {google_id: req.query.googleId}, defaults: {
      'google_id': req.query.googleid,
      'first_name': req.query.givenName,
      'last_name': req.query.familyName,
      'count_games_played': 0,
      'last_login': date,
      'email': req.query.email
    }})
    .spread((user, created) => {
      user.created = created;
      res.send(user);
    });
  })
app.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  console.log(req.user);
  res.redirect('/' + req.user.user_id);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});

app.listen(1337, function() {
  console.log('😎 listening on 1337');
});
