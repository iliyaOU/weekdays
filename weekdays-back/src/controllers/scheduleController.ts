import { Request, Response } from "express";
import { isWeekday, Weekday } from "../types";
import { DateTime } from "luxon";
import { Schedule } from "../models/Schedule";

export const updateWeekdayTime = async (
  req: Request<
    {},
    {},
    { weekday: Weekday; timeStart: string; timeEnd: string }
  >,
  res: Response
): Promise<void> => {
  const { weekday, timeStart, timeEnd } = req.body;
  const lowerWeekday = weekday.toLocaleLowerCase() as Weekday;
  if (!isWeekday(weekday)) res.status(400).json({ error: "incorrect weekday" });
  if (!DateTime.fromFormat(timeStart, "HH:mm").isValid)
    res.status(400).json({ error: "incorrect timeStart" });
  if (!DateTime.fromFormat(timeEnd, "HH:mm").isValid)
    res.status(400).json({ error: "incorrect timeEnd" });

  try {
    await Schedule.findOneAndUpdate(
      { user_id: req.userId },
      { $set: { [lowerWeekday]: `${timeStart}-${timeEnd}` } },
      { upsert: true }
    );
  } catch (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({});
  return;
};
