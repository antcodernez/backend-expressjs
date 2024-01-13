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
  },
  //Voy a generar datos calculados por medio de un campo virtual
  total: {
    type:DataTypes.VIRTUAL, //Asi indico que este campo no va a estar en la tabla
    get() { //Con un get especifico como voy a calcular ese campo
        if(this.items && this.items.length > 0)
          {
            return this.items.reduce((total, item) => {
              return total + (item.price * item.OrderProduct.amount);
            }, 0); //tiliza la función reduce en la propiedad items para calcular el valor total. La función reduce recorre cada elemento en items y acumula un valor total. En cada iteración, se multiplica el precio del artículo (item.price) por la cantidad del artículo (item.OrderProduct.amount) y se suma al total acumulado.
            // total: Es el acumulador que se va actualizando en cada iteración.
            // item: Representa cada elemento en items.
            // item.price * item.OrderProduct.amount: Calcula el valor del artículo multiplicando su precio por la cantidad.
            // , 0): El segundo argumento de reduce establece el valor inicial del acumulador (total). En este caso, comienza en 0.

            // return 0;: Si no hay elementos en items (longitud igual a cero), se devuelve 0 como el valor total.
          }
        return 0;
    }
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
