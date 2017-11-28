/*
 * db/models/game_difficulties.js
 *
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('game_difficulties', {
    game_difficulty_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    game_difficulty_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_time_manipulation: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
};
