"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JournalEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JournalEntry.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide a date",
          },
        },
      },
      contents: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide content",
          },
          notNull: {
            msg: "Please provide content",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "JournalEntry",
    }
  );
  return JournalEntry;
};
