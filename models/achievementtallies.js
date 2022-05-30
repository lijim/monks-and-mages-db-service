'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AchievementTallies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AchievementTallies.init({
    username: DataTypes.STRING,
    winCount: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'AchievementTallies',
  });
  return AchievementTallies;
};