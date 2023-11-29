const {Model, DataTypes, Sequelize} = require("sequelize")

const COSTUMER_TABLE = "tb_costumers";

const CostumerSchema = {
  id : {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
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
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue:  Sequelize.NOW
  }
}


class Customer extends Model {
  static associate ()
    {
      
    }
  static config(sequelize)
    {
      return {
        sequelize,
        tableName: COSTUMER_TABLE,
        modelName: "Customer",
        timestamps: false
      }
    }
}


module.exports = {Customer, COSTUMER_TABLE, CostumerSchema};
