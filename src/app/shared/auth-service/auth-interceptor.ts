import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /*
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt');
    }

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedReq);
    }
    */
    let token: string | null = null;


    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt');

    }
    const modifiedReq = token ?
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }) : req;
    // HANDLE GLOBAL ERRORS HERE AND LET SPECIFIC ERRORS BE CATCHED IN COMPONENTS

    return next.handle(modifiedReq).pipe(

      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            //this.router.navigate(['']);
            this.snackBar.open('You are unauthorized, please choose you role and login', 'Close', { duration: 3000 });
            break;
          case 403:
            //this.router.navigate(['']);
            this.snackBar.open('Forbidden operation', 'Close', { duration: 3000 });
            break;
          case 500:
            this.snackBar.open('Internal server error', 'Close', { duration: 3000 });
            break;
        }
        return throwError(() => error);
      })
    )

  }
}