"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecurringType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RecurringType.belongsTo(models.Event);
    }
  }
  RecurringType.init(
    {
      name: DataTypes.STRING,
      EventId: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "RecurringType",
    }
  );
  return RecurringType;
};
