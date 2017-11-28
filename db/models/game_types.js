/*
 * db/models/game_types.js
 *
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('game_types', {
    game_type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    game_type_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
};
