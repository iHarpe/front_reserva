import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  // No interceptar login y signin
  if (request.url.includes('/login') || request.url.includes('/signin')) {
    return next(request);
  }

  const token = sessionService.getToken();
  
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Token expirado o inválido
        sessionService.logout();
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};