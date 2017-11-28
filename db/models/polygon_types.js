/*
 * db/models/polygon_types.js
 *
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('polygon_types', {
    polygon_type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    polygon_type_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
};
