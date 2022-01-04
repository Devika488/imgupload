import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../_services/auth.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth, private authService: AuthService) {
    // console.log('token interceptor constructor');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    return this.auth.idToken.pipe(
      mergeMap((token: any) => {
        // console.log("jwt : "+authToken);
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${authToken}`,
              'Access-Control-Allow-Origin': '*',
            },
          });
          console.warn(request);
        }

        return next.handle(request);
      })
    );
  }
}
