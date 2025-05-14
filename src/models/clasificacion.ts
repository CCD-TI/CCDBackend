import { DataTypes } from "sequelize";
import { getSiscardRevolution } from "../db/connection"; // Obtener la instancia de Sequelize

const SiscardRevolution = getSiscardRevolution();


const Clasificacion = SiscardRevolution.define(
  "Clasificacion",
  {
    IdClasificacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Clasificacion: {
      type: DataTypes.STRING,
    },
    TipoProducto_id: {
      type: DataTypes.INTEGER,
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

export default Clasificacion;
