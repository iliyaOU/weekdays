import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Day } from './schedule.types';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private updateScheduleUrl = 'http://localhost:2000/api/schedule';

  constructor(private http: HttpClient) {}

  updateSchedule(day: Day): Observable<any> {
    return this.http.put(this.updateScheduleUrl, {
      weekday: day.value,
      timeStart: day.startTime,
      timeEnd: day.endTime,
    });
  }
}
