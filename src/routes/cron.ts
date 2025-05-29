import { Router } from "express";
import cronjob from "../controllers/api/Cron"; // Asegúrese de que exporta una función

const router = Router();

router.get('/cron', cronjob)

export default router;