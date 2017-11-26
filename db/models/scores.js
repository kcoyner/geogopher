/*
 * db/models/scores.js
 *
 */

const Sequelize = require('sequelize');
const Users = require('./users');
const Games = require('./games');
const Game_types = require('./game_types');
const Game_difficulties = require('./game_difficulties');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Scores', {
      score_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: Users.user_id,
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  count_polygons_identified: Sequelize.INTEGER,
  game_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Games,
      key: Games.game_id,
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  game_type_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Game_types,
      key: Game_types.game_type_id,
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  game_difficulty_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Game_difficulties,
      key: Game_difficulties.game_difficulty_id,
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  time_taken: Sequelize.STRING,
  when_game_played: Sequelize.DATE,
  ip_where_game_played: Sequelize.STRING
  })
};

