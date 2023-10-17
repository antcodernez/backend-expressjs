const {Model, DataTypes, Sequelize} = require("sequelize");

//Una buena practica es definir el nombre de mi tabla primero
const USER_TABLE = "tb_users";

// cual seria el schema que queremos crear en la bd

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER 
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at", //este sera su nombre en la bd y arriba sera su nombre para manipularlo en JS
    defaultValue: Sequelize.NOW
  }

} //define su estructura en la bd != los schemas que validan la informacion de entrada


class User extends Model { // Model tiene metodos que seran las formas en las que yo voy a hacer querys
//Voy a crear metodos staticos; que no necesito una declaracion del objeto para acceder a los metodos

  static associate(){
    //definimos todas las relaciones
  }
  static config(sequelize){
    //Vamos a definir una configuracion y vamos a recibir una conexion, comunmente llamada sequelize y retornamos una configuracion

    return {
      sequelize, //Que conexion va a tener
      tableName: USER_TABLE, //nombre de la tabla
      modelName: "User", //definimos el nombre del modelo
      timeStamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User}
