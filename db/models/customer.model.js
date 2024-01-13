const {Model, DataTypes, Sequelize} = require("sequelize");
const {USER_TABLE} = require("./user.model");
const CUSTOMER_TABLE = "tb_customers";

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull : false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "last_name"
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: "user_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE, //Le digo a que tabla va relacionada
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
}

class Customer extends Model {

  static associate(models)
    {
      this.belongsTo(models.User, {as: 'user'});
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: "customerId"
      });
      //Estoy cargando la llave foranea en customer
      //El alias es importante porque puedo cargar las asociaciones en mis consultas
    }

  static config(sequelize)
    {
      return {
        sequelize,
        tableName: CUSTOMER_TABLE,
        modelName: "Customer",
        timestamps: false
      }
    }
}
module.exports = {Customer, CustomerSchema, CUSTOMER_TABLE}
