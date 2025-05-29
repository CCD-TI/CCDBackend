import { Router } from "express";
import cronjob from "../controllers/cron/Cron"; // Asegúrese de que exporta una función

const router = Router();

router.get("/", async (_req, res) => {
  try {
    await cronjob();
    res.status(200).json({ message: "Cron ejecutado correctamente" });
  } catch (error) {
    console.error("Error en cronjob:", error);
    res.status(500).json({ error: "Error al ejecutar cron" });
  }
});

export default router;
