/*
 * db/models/games.js
 *
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('games', {
    game_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    game_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_json: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_center_coords: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_zoom: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 0,
        max: 10
      }
    },
    max_count_polygons: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
    },
    base_time: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    img_asset: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};
