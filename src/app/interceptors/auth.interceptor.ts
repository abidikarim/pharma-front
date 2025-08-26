import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: import('@angular/common/http').HttpHandlerFn): Observable<HttpEvent<any>> => {
  const http = inject(HttpClient);

  // Make sure every request sends cookies
  const clonedReq = req.clone({
    withCredentials: true
  });

  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Access token expired, call refresh endpoint
        return http.post('/api/refresh', { withCredentials: true }).pipe(
          switchMap(() => {
            // Retry the original request after refresh
            return next(clonedReq);
          }),
          catchError(innerErr => {
            // Refresh failed → propagate error (optionally logout)
            return throwError(() => innerErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
