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
        //   console.log('Error Status : ' + err.status,err.error.error);
        //   errmsg = `Error Status ${err.status}: ${err.error.error}`;
          if (err.status === 401) {
            this.routeMessageService.message = 'Please login again.';
            this.authService.doLogout();
            handled = true;
          }
        }

        if (!handled) {
            if (err.error.error.message) {
                this.routeMessageService.message =err.error.error.message;
                // this.routeMessageService.message =`Error Status ${err.status}: `+JSON.stringify( err.error.error.message);
                
                console.warn("err interceptor : "+   this.routeMessageService.message);
                
        }
        else if(err.error.error){
            this.routeMessageService.message =err.error.error;

        }
        else {
          return throwError("Unexpected problem occurred");
        }
          } 
        
        return throwError(errmsg);
      })
    );
  }
}
