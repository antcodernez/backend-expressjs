const {Model, Sequelize, DataTypes} = require ("sequelize");

const ORDER_TABLE = "tb_orders";

const OrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW

  }}

class Order extends Model {
  static associate()
    {

    }
  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestaps: false
    }
  }
}


module.exports = {ORDER_TABLE, OrderSchema, Order}
