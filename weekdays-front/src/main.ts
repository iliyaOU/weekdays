import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { ScheduleComponent } from './app/schedule/schedule.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './app/auth/auth.interceptor';
import { AuthGuard } from './app/auth/auth.guard';

// Определение маршрутов
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
];

// Запуск приложения с маршрутизацией
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
