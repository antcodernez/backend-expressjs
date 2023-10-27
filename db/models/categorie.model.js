const {Model, DataTypes, Sequelize} = require("sequelize");

const CATEGORIE_TABLE = "tb_categories";

const CategorieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  }
}

class Categorie extends Model {
  static associate()
    {

    }
  static config(sequelize){
    return {
      sequelize,
      tableName: CATEGORIE_TABLE,
      modelName: "Categorie",
      timestamps: false
    }
  }
}

module.exports = {CATEGORIE_TABLE, CategorieSchema, Categorie};
