'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class money_values extends Model {
    static associate (models) {}
  }
  money_values.init({
    treasure_id: DataTypes.INTEGER,
    amt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'money_values',
    createdAt: false,
    updatedAt: false
  })
  return money_values
}
