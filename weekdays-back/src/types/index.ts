export interface User {
  email: string;
  password: string;
}

export interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export function isWeekday(weekday: string): weekday is Weekday {
  return [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].includes(weekday.toLowerCase());
}

export interface AccessRequestParams {}
