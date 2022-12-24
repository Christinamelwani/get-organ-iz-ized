"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventInstance.belongsTo(models.Event);
    }
  }
  EventInstance.init(
    {
      date: DataTypes.DATEONLY,
      EventId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EventInstance",
    }
  );
  return EventInstance;
};
