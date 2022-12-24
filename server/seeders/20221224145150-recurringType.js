"use strict";

/** @type {import('sequelize-cli').Migration} */
const recurringTypes = require("../data/recurringTypes.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    recurringTypes.forEach((recurringType) => {
      recurringType.createdAt = new Date();
      recurringType.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("RecurringTypes", recurringTypes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RecurringTypes", null, {});
  },
};
