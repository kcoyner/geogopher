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
  return sequelize.define('scores', {
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
    count_polygons_entered: Sequelize.INTEGER,
    count_total_submissions: Sequelize.INTEGER,
    count_total_hints: Sequelize.INTEGER,
    polygons_answered: Sequelize.STRING,
    polygons_unanswered: Sequelize.STRING,
    polygons_skipped: Sequelize.STRING,
    incorrect_entries: Sequelize.STRING,
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
    game_timer_start: Sequelize.INTEGER,
    game_timer_remaining: Sequelize.INTEGER,
    game_start_timestamp: Sequelize.DATE,
    game_end_timestamp: Sequelize.DATE,
    ip_where_game_played: Sequelize.STRING
  });
};
