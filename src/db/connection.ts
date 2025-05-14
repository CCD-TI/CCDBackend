import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// Variable para la instancia única
let siscardRevolutionInstance: Sequelize | null = null;

// Función que devuelve la instancia única (pero no la conecta)
export function getSiscardRevolution(): Sequelize {
  if (!siscardRevolutionInstance) {
    console.log("Creando nueva instancia de Sequelize");
    siscardRevolutionInstance = new Sequelize(
      process.env.NombreBD1 || "",
      process.env.UsuarioBD1 || "",
      process.env.ClaveBD1 || "",
      {
        dialectModule: pg,
        dialect: "postgres",
        host: process.env.IpBD1 || "",
        port: 5432,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {
          max: 3, // 🔽 REDUCIDO para Vercel o entornos con límite de conexiones
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

// Función para conectar (debes llamarla en la inicialización del proyecto)
export const connect = async () => {
  try {
    const db = getSiscardRevolution(); // 👈 Llama aquí a get()
    await db.authenticate();
    console.log("Base de datos CCD online");
  } catch (error) {
    console.error("Base de datos CCD offline");
    throw error;
  }
};

// Función para cerrar la conexión
export const close = async () => {
  if (siscardRevolutionInstance) {
    await siscardRevolutionInstance.close();
    siscardRevolutionInstance = null;
    console.log("Conexión a base de datos cerrada");
  }
};

// Ya NO exportes la instancia directamente ❌
// export default SiscardRevolution;  <-- BORRADO

// Solo exporta las funciones
export default {
  getSiscardRevolution,
  connect,
  close,
};
