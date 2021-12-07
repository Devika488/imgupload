import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,HttpEvent,
  HttpHandler,HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    if (authToken) {
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
    }
    
    return next.handle(req);
    
        
  }

}



// if(status==401){
//     navigate to login
// }