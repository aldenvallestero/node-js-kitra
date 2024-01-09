'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class treasures extends Model {
    static associate(models) {}
  }
  treasures.init({
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'treasures',
    createdAt: false,
    updatedAt: false,
  });
  return treasures;
};