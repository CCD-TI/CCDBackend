import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let siscardRevolutionInstance: Sequelize | null = null;

export function getSiscardRevolution(): Sequelize {
  if (!siscardRevolutionInstance) {
    console.log("Creando nueva instancia de Sequelize");
    siscardRevolutionInstance = new Sequelize(
      process.env.NombreBD1 || "",
      process.env.UsuarioBD1 || "",
      process.env.ClaveBD1 || "",
      {
        host: process.env.IpBD1 || "",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        logging: false,
      }
    );
  }

  return siscardRevolutionInstance;
}

export const connect = async () => {
  try {
    const sequelize = getSiscardRevolution();
    await sequelize.authenticate();
    console.log("Base de datos CCD online");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);  // Aumenta los detalles del error para depuración
    console.log("Base de datos CCD offline");
    throw error;
  }
};

export const close = async () => {
  if (siscardRevolutionInstance) {
    await siscardRevolutionInstance.close();
    siscardRevolutionInstance = null;
    console.log("Conexión a base de datos cerrada");
  }
};

// 👉 Esta línea permite seguir usando `import db from "../../db/connection"`
export default getSiscardRevolution();
