/*
 * db/models/polygon_regions.js
 *
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('polygon_regions', {
    polygon_region_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    polygon_region_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
};
