const {Model, Sequelize, DataTypes} = require ("sequelize");
const { CUSTOMER_TABLE } = require("./customer.model")
const ORDER_TABLE = "tb_orders";

const OrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orderState: {
    type: DataTypes.ENUM('entregado', 'enviado', 'pendiente'),
    allowNull: true,
    defaultValue: 'pendiente',
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  }
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: "customer",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false, // Fix the typo here
    };
  }
}


module.exports = {ORDER_TABLE, OrderSchema, Order}
