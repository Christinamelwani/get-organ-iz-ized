"use strict";

/** @type {import('sequelize-cli').Migration} */

const categories = require("../data/categories.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    categories.forEach((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
