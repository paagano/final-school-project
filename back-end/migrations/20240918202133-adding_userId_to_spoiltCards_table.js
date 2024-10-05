'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("spoiltcards", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "cardId",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("spoiltcards", "userId");
  },
};
