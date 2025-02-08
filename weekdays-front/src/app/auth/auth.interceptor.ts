import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getToken();

  let newReq = req.clone({});

  if (authToken)
    newReq = req.clone({
      headers: req.headers.append('Authorization', authToken),
    });

  return next(newReq);
}
