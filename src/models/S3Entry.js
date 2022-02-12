'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class S3Entry extends Model {
    static associate(models) {
    }
  }
  S3Entry.init({
    resource: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'S3Entry',
    tableName: 'entries'    
  });
  return S3Entry;
};