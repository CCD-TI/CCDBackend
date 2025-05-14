import { config } from 'dotenv';
import { request, response } from 'express';
import db from "../../db/connection";



export const ObtenerFechaMembresia = async (req = request, res = response) => {
    const { UsuarioId }:{UsuarioId:Number} = req.body; // Recibiendo el ID del usuario

    // Consulta SQL para obtener la fecha de expiración y el estado de la membresía
    const QuerySql = `
        SELECT "FechaExpiracion", "Status"
        FROM "membresias"
        WHERE "UsuarioId" = :UsuarioId
    `;

    try {
        
        // Ejecutar la consulta de la base de datos
        const result: any[]  = await db.query(QuerySql, {
            replacements:{ UsuarioId},
            type: 'SELECT' ,
            raw: true, 
        });

        // Verificar si se encontró algún resultado
        if (result && result.length > 0) {
            const { FechaExpiracion, Status } = result[0];

            // Calcular la diferencia de días hasta la fecha de expiración
            const today = new Date();
            const expirationDate = new Date(FechaExpiracion);
            const diffTime: number = expirationDate.getTime() - today.getTime(); // Diferencia en milisegundos
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Días restantes

            // Si prefieres mostrar en meses, podrías hacer algo como:
            const diffMonths = expirationDate.getMonth() - today.getMonth() + 
                               (12 * (expirationDate.getFullYear() - today.getFullYear()));

            // Determinar el mensaje a mostrar
            let timeRemaining = `${diffDays} días restantes`; // Días restantes
            if (diffMonths > 0) {
                timeRemaining = `${diffMonths} meses restantes`; // Meses restantes
            }

            // Enviar la respuesta con los datos de la membresía y tiempo restante
            return res.status(200).json({
                ok: true,
                message: 'Membresía encontrada.',
                data: {
                    FechaExpiracion,
                    Status,
                    timeRemaining, // Este valor lo usaremos en el navbar
                },
            });
        } else {
            // Si no se encuentra la membresía, responder con un mensaje de error
            return res.status(404).json({
                ok: false,
                message: 'Membresía no encontrada para este usuario.',
            });
        }
    } catch (error) {
        // Manejar cualquier error de la base de datos
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

