/*
 * db/models/users.js
 *
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password_salt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    count_games_played: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    last_login: {
      type: Sequelize.DATE,
      allowNull: false
    },
    is_first_login: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    user_ip: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
};
