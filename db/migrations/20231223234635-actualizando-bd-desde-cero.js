'use strict';
const {UserSchema, USER_TABLE,} = require("./../models/user.model");
const {CategorieSchema, CATEGORIE_TABLE,} = require("./../models/categorie.model");
const {OrderSchema, ORDER_TABLE,} = require("./../models/order.model");
const {ProductSchema, PRODUCT_TABLE,} = require("./../models/product.model");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORIE_TABLE, CategorieSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORIE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
