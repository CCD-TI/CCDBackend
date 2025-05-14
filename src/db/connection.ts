import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();

// Variable para la instancia única
let siscardRevolutionInstance: Sequelize | null = null;

// Función que devuelve siempre la misma instancia
export function getSiscardRevolution(): Sequelize {
if (!siscardRevolutionInstance) {
  console.log("Creando nueva instancia de Sequelize");
  siscardRevolutionInstance = new Sequelize(
    process.env.NombreBD1 || "",
    process.env.UsuarioBD1 || "",
    process.env.ClaveBD1 || "",
    {
        dialectModule: pg,
        dialect: 'postgres',
        host: process.env.IpBD1 || "",
        port: 5432,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          },
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
        }
      }
  );
}

  return siscardRevolutionInstance;
}

// Obtener la instancia única
export const SiscardRevolution = getSiscardRevolution();

// Función para conectar
export const connect = async () => {
  try {
    await SiscardRevolution.authenticate();
    console.log("Base de datos CCD online");
  } catch (error) {
    console.log("Base de datos CCD offline");
    throw error;
  }
};

// Función para cerrar la conexión
export const close = async () => {
  if (siscardRevolutionInstance) {
    await siscardRevolutionInstance.close();
    siscardRevolutionInstance = null; // Se establece en null para asegurar que la próxima conexión cree una nueva instancia
    console.log("Conexión a base de datos cerrada");
  }
};

export default SiscardRevolution;
