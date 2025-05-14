import { DataTypes } from "sequelize";
import { getSiscardRevolution  } from "../db/connection";

const SiscardRevolution = getSiscardRevolution();
const SubCategoria = SiscardRevolution.define(
  "SubCategoria",
  {
    IdSubCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SubCategoria: {
      type: DataTypes.INTEGER,
    },
    Categoria_id: {
      type: DataTypes.INTEGER,
    },
    Estado_id: {
      type: DataTypes.STRING,
    },
    UltimaFechMod: {
      type: DataTypes.DATE,
    },
    UltimoUserMod: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, 
  }
);

export default SubCategoria;
