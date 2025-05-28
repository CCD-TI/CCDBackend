import { config } from 'dotenv';
import { request, response } from 'express';
import db from "../../db/connection";
import { QueryTypes } from 'sequelize';

config();

export default async function cronjob(_req = request, res = response) {
  try {
    // Consultar membresías que expiran hoy
    const membresias = await db.query(`
      SELECT "IdMembresia", "UsuarioId"
      FROM "membresias"
      WHERE DATE("FechaExpiracion") = CURRENT_DATE AND "Status" = 1
    `, { type: QueryTypes.SELECT }) as { IdMembresia: number; UsuarioId: number }[];

    if (membresias.length === 0) {
      return res.status(200).json({ message: "No hay membresías que expiren hoy." });
    }

    // Actualizar membresías y usuarios
    for (const { IdMembresia, UsuarioId } of membresias) {
      await db.query(`
        UPDATE "membresias"
        SET "Status" = 0
        WHERE "IdMembresia" = :id
      `, {
        replacements: { id: IdMembresia },
        type: QueryTypes.UPDATE,
      });

      await db.query(`
        UPDATE "Usuario"
        SET "Premium" = 0
        WHERE "IdUsuario" = :usuarioId
      `, {
        replacements: { usuarioId: UsuarioId },
        type: QueryTypes.UPDATE,
      });
    }

    res.status(200).json({ message: `${membresias.length} membresía(s) expiradas.` });

  } catch (error) {
    console.error('Error en cron job:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
