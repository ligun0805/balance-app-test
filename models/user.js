'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Balance must be an integer'
        },
        min: {
          args: [0],
          msg: 'Balance cannot be negative'
        }
      }
    }
  }, {
    timestamps: true, 
  });

  return User;
};