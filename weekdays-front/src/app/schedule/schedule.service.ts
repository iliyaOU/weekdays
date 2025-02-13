import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Day } from "./schedule.types";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private updateScheduleUrl = "http://localhost:3010/api/schedule";

  constructor(private http: HttpClient) {}

  updateSchedule(day: Day): Observable<any> {
    return this.http.put(this.updateScheduleUrl, {
      weekday: day.value,
      timeStart: day.startTime,
      timeEnd: day.endTime,
    });
  }
}
