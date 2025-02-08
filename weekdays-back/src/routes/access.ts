import { Router } from "express";
import { DateTime } from "luxon";
import { Schedule } from "../models/Schedule";
import { Weekday } from "../types";

const router = Router();

router.get("/", async (req, res) => {
  const currentDay = DateTime.now()
    .setLocale("en-gb")
    .weekdayLong.toLowerCase() as Weekday;
  const schedules = await Schedule.find({ [currentDay]: { $ne: null } });
  let isAllowed = true;

  for (const schedule of schedules) {
    if (typeof schedule[currentDay] !== "string") continue;
    const [timeStart, timeEnd] = schedule[currentDay].split("-");
    if (DateTime.fromFormat(timeStart, "HH:mm") > DateTime.now()) {
      isAllowed = false;
      break;
    }
    if (DateTime.fromFormat(timeEnd, "HH:mm") < DateTime.now()) {
      isAllowed = false;
      break;
    }
  }

  if (isAllowed) {
    res.json({ success: true, message: "Доступ разрешен" });
  } else {
    res.status(403).json({ success: false, message: "Доступ запрещен" });
  }
});

export default router;
