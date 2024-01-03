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
    //Relacion muchos a muchos, digo que el modelo order tiene una relacion a muchos productos que se va a resolver con mis indicadores abajo
    this.belongsToMany(models.Product, {
      as: "items",
      through: models.OrderProduct, //A traves de cual tabla voy a resolver esta relacion
      foreignKey: "orderId",
      otherKey: "productId"
    }); // Voy a indicar quien es mi tabla ternaria
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
