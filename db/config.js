/*
 *  util/dbconfig.js
 */

const Sequelize = require('sequelize');

const DBPASSWD = process.env.DBPASSWD;

const db = new Sequelize('geogopherdb', 'webAppLogin', DBPASSWD, {
  host: 'geogophers-postgresql-db.c8nqtytgojtc.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

db.authenticate()
  .then(() => {
    console.log('AWS Postgresql connection has been established successfully, 😎 listening on 5432')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Game_difficulties = db.import(__dirname + "/models/game_difficulties");
const Game_types = db.import(__dirname + "/models/game_types");
const Games = db.import(__dirname + "/models/games");
const Polygon_types = db.import(__dirname + "/models/polygon_types");
const Polygon_regions = db.import(__dirname + "/models/polygon_regions");
const Polygons = db.import(__dirname + "/models/polygons");
const Users = db.import(__dirname + "/models/users");
const Scores = db.import(__dirname + "/models/scores");

module.exports = db;

