import { DataTypes } from "sequelize";
import { getSiscardRevolution  } from "../db/connection";

const SiscardRevolution = getSiscardRevolution();
const PerfilUsuario = SiscardRevolution.define(
  "PerfilUsuario",
  {
    IdPerfilUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Perfil_id: {
      type: DataTypes.INTEGER,
    },
    Usuario_id: {
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

export default PerfilUsuario;
