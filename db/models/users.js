/*
 * db/models/users.js
 *
 */

const Sequelize = require('sequelize');
const Scores = require('./scores');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('users', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    google_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password_salt: {
      type: Sequelize.STRING,
      allowNull: true
    },
    count_games_played: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    last_login: {
      type: Sequelize.DATE,
      allowNull: true
    },
    is_first_login: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    user_ip: {
      type: Sequelize.STRING,
      allowNull: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true
    },
    anonymous_user: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: false
    }
  } 
)

User.prototype.validPassword = function validPassword(password) {
 const hash = this.password_hash;
 return new Promise(function(resolve, reject) {
   bcrypt.compare(password, hash).then(function(res) {
    return resolve(res);
  });
 }) 
}

User.beforeCreate(function(user, options) {
  if(user.google_id === null || user.google_id === undefined) {
    return hashPassword(user.password_hash)
    .then(success => {
      user.password_hash = success;
    })
    .catch(err => {
      if (err) console.log(err);
    });
  } else {
    return;
  }
});
return User;
};

function hashPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}
