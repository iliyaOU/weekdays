import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { updateWeekdayTime } from "../controllers/scheduleController";

const router = Router();

// Обновить расписание
router.put("/", authMiddleware, updateWeekdayTime);

export default router;
