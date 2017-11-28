/*
 * db/models/polygons.js
 *
 */

const Polygon_regions = require('./polygon_regions');
const Polygon_types = require('./polygon_types');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('polygons', {
    polygon_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    polygon_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    coordinates: {
      type: Sequelize.STRING,
      allowNull: false
    },
    polygon_accepted_names: {
      type: Sequelize.STRING,
      allowNull: false
    },
    polygon_type_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Polygon_types,
        key: Polygon_types.polygon_type_id,
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    polygon_region_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Polygon_regions,
        key: Polygon_regions.polygon_region_id,
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  })
};
