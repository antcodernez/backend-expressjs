'use strict';
const {USER_TABLE,} = require("./../models/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, "token", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, "token");
  }
};
