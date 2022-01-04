import { Injectable } from '@angular/core';
import { user } from 'src/models/signup';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { apiPaths } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.baseUrl;
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  currentUser = {};
  islogin: boolean = false;
  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: user): Observable<any> {
    let api = `${this.endpoint}/${apiPaths.signup}`;
    
    return this.http.post(api, user);
  }

  // Sign-in
  signIn(user: user) {
    return this.http.post<any>(`${this.endpoint}/${apiPaths.signin}`, user);
  }


// get login
isLoggedIn(): boolean {
  let authToken = sessionStorage.getItem('access_token');
  return authToken !== null ? true : false;
}


  getToken() {
    return sessionStorage.getItem('access_token');
  }

  // check access token expire


  doLogout() {
    let removeToken = sessionStorage.removeItem('access_token');
    let removeuser = sessionStorage.removeItem('username')
    if (removeToken == null && removeuser== null) {
      this.router.navigate(['/login']);
    }
  }

  // Error
  // handleError(error: HttpErrorResponse) {
  //   let msg = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     msg = error.error.message;
  //   } else {
  //     // server-side error
  //     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(msg);
  // }
}
