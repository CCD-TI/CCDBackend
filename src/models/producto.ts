import { DataTypes } from "sequelize";
import { getSiscardRevolution  } from "../db/connection";

const SiscardRevolution = getSiscardRevolution();
const Producto = SiscardRevolution.define(
  "Producto",
  {
    IdProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Cliente_id: {
      type: DataTypes.INTEGER,
    },
    Modelo_id: {
      type: DataTypes.INTEGER,
    },
    Area_id: {
      type: DataTypes.INTEGER,
    },
    Especificacion: {
      type: DataTypes.STRING,
    },
    Gamma: {
      type: DataTypes.STRING,
    },
    Estado_id: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Producto;
