import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("s3effdgbhg");

  const authService = inject(AuthService);
  const token = authService.accessToken;  // Get the current token

  console.log('Sending request with token:', token);

  // Clone the request and add the Authorization header
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });



  return next(clonedRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      // Handle 401 Unauthorized errors
      if (err.status === 401) {
        // Attempt to refresh the token
        return authService.refresh().pipe(
          switchMap((res: any) => {
            // Update the access token in the service
            authService.accessToken = res.token;

            // Retry the original request with the new token
            const refreshedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`  // Use the new token here
              }
            });
            return next(refreshedRequest);
          })
        );
      }
      return throwError(() => err);  // If it's not a 401, just throw the error
    })
  );
};
