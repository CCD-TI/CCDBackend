// api/cron-job.js

import { config } from 'dotenv';
import { request, response } from 'express';
import db from "../../db/connection";

// Cargar las variables de entorno si las tienes en un archivo .env
config();

export default async function handler(_req = request, res = response) {


  try {
    // Conectar a la base de datos

    // Actualizar las membresías expiradas
    await db.query(`
      UPDATE "membresias"
      SET "Status" = 0
      WHERE "FechaExpiracion" < NOW() AND "Status" != 0;
    `);

    // Actualizar el estado de los productos en "producto_stock"
    await db.query(`
      UPDATE "ProductoStock"
      SET "Membresia_Status" = 0
      WHERE "Membresia_Id" IN (
        SELECT "IdMembresia"
        FROM "membresias"
        WHERE "FechaExpiracion" < NOW() AND "Status" = 0
      );
    `);

    // Responder a la solicitud HTTP
    res.status(200).json({ message: "Membresías y Producto Stock actualizados exitosamente." });
  } catch (error) {
    console.error('Error al ejecutar el cron job:', error);
    res.status(500).json({ error: "Error interno en el cron job" });
  } finally {
    // Cerrar la conexión a la base de datos
  }
}
