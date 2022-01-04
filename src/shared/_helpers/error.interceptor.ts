import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { ErrServicesService } from '../_services/errservices.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private routeMessageService: ErrServicesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let handled: boolean = false;
    return next.handle(req).pipe(
      catchError((err) => {
        // onError
        let errmsg = null;
        if (err.error instanceof ErrorEvent) {
          errmsg = `Error: ${err.error.message}`;
        } else if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.routeMessageService.message = 'Please login again.';
            this.authService.doLogout();
            handled = true;
          }
        }

        if (!handled) {
          this.routeMessageService.message=err.error.error.message || err.error.error ;
          if(!this.routeMessageService.message)
           {
            return throwError('Unexpected problem occurred');
          }
        }

        return throwError(errmsg);
      })
    );
  }
}
