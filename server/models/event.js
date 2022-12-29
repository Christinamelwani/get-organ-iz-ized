"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Category);
    }
  }
  Event.init(
    {
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide a category",
          },
          notEmpty: {
            msg: "Please provide a category",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide a title",
          },
          notNull: {
            msg: "Please provide a title",
          },
        },
      },
      isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide a value for isRecurring",
          },
        },
      },
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      duration: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
