import { Router } from "express";
import { DateTime } from "luxon";
import { Schedule } from "../models/Schedule";
import { Weekday } from "../types";

const router = Router();

router.get("/", async (req, res) => {
  const currentDay = DateTime.now().weekdayLong.toLowerCase() as Weekday;
  const schedules = await Schedule.find({ [currentDay]: { $ne: null } });
  let isAllowed = true;

  for (const schedule of schedules) {
    if (typeof schedule[currentDay] !== "string") continue;
    const [timeStart, timeEnd] = schedule[currentDay].split("-");
    if (
      DateTime.fromFormat(timeStart, "HH:mm").toUTC() > DateTime.now().toUTC()
    ) {
      isAllowed = false;
      break;
    }
    console.log({
      testConv1: DateTime.fromFormat(timeEnd, "HH:mm", {
        zone: "Europe/Moscow",
      }),
      testConv2: DateTime.fromFormat(timeEnd, "HH:mm", {
        zone: "Europe/Moscow",
      }).toUTC(),
      now: DateTime.now().toUTC(),
    });
    if (
      DateTime.fromFormat(timeEnd, "HH:mm", { zone: "Europe/Moscow" })
        .setZone("Europe/Moscow")
        .toUTC() < DateTime.now().toUTC()
    ) {
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
