"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("branches", "region", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "brancName",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("branches", "region");
  },
};
