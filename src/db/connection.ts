import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();

// Variables para el patrón Singleton
let siscardRevolutionInstance: Sequelize | null = null;

// Arreglo de conexiones para mantener compatibilidad con el código existente
export const db: Sequelize[] = [];

// Función que devuelve siempre la misma instancia
export function getSiscardRevolution(): Sequelize {
  if (!siscardRevolutionInstance) {
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
    
    // Limpiar el arreglo antes de agregar la instancia
    // Esto asegura que db[0] siempre sea nuestra instancia Singleton
    db.length = 0;
    
    // Añadir a la lista de conexiones
    db.push(siscardRevolutionInstance);
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
    siscardRevolutionInstance = null;
    db.length = 0; // Limpiar el arreglo
    console.log("Conexión a base de datos cerrada");
  }
};

export default SiscardRevolution;