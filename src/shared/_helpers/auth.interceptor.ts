import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
    // console.log('token interceptor constructor rest api');

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    if (authToken) {

      let authrequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });

      return next.handle(authrequest);
    } else {
      return next.handle(req);
    }
  }
}
