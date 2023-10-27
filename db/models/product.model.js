const {Model, DataTypes, Sequelize} = require("sequelize");

const  PRODUCT_TABLE = "tb_products";

const ProductSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
	name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  isBLock: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type:DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  }
}

// define o extend Model
// Se infiere el nombre de la tabla y se generaliza en plural, sequelize.define('user', userSchema); definirá la tabla users.
class Product extends Model
  {
    static associate()
      {

      }
    static config(sequelize)
      {
        return {
          sequelize,
          tableName: PRODUCT_TABLE,
          modelName: "Product",
          timestamps: false
        }
      }
  }

module.exports = { PRODUCT_TABLE, ProductSchema, Product};
