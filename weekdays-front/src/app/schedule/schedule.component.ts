import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Day } from './schedule.types';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FormsModule, CommonModule], // Импорт FormsModule и CommonModule
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  constructor(private scheduleService: ScheduleService) {}

  days = [
    { name: 'Понедельник', value: 'monday', startTime: '00:00', endTime: '23:59' },
    { name: 'Вторник', value: 'tuesday', startTime: '00:00', endTime: '23:59' },
    { name: 'Среда', value: 'wednesday', startTime: '00:00', endTime: '23:59' },
    { name: 'Четверг', value: 'thursday', startTime: '00:00', endTime: '23:59' },
    { name: 'Пятница', value: 'friday', startTime: '00:00', endTime: '23:59' },
    { name: 'Суббота', value: 'saturday', startTime: '00:00', endTime: '23:59' },
    { name: 'Воскресенье', value: 'sunday', startTime: '00:00', endTime: '23:59' },
  ];

  updateTime(day: Day) {
    this.scheduleService.updateSchedule(day).subscribe();
  }
}
