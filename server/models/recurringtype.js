"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecurringType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  RecurringType.init(
    {
      name: DataTypes.STRING,
      interval: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "RecurringType",
    }
  );
  return RecurringType;
};
