import cronjob from '../../src/controllers/cron/Cron';

export default async function handler(req, res) {
  // Solo aceptar método GET (puedes cambiarlo si quieres)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Validar el secreto en Authorization header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (token !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await cronjob();
    res.status(200).json({ message: 'Cron ejecutado correctamente' });
  } catch (error) {
    console.error('Error en cron job:', error);
    res.status(500).json({ error: 'Error al ejecutar cron' });
  }
}
