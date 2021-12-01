import { Injectable } from '@angular/core';
import { user } from '../signindash/signdash';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://serene-hollows-11661.herokuapp.com/api/v1';
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: user): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: user) {
    console.warn('USER:' + user.email + '&' + user.password);
    // console.warn(".value"+user.value);

    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        // console.warn("res :"+res);
        console.warn(JSON.stringify(res)); //undefined
        this.currentUser = res;
        console.warn('inside signin ' + res);

        this.router.navigate(['/user-profile/' + user.email]);

        // this.getUserProfile(res).subscribe((res) => {
        //   this.currentUser = res;
        //   console.warn("inside signin "+res);

        //   this.router.navigate(['user-profile/' + user.email]);

        // })
      });
  }

  // User profile
  //  getUserProfile(data:any): Observable<any> {
  //   // let api = `${this.endpoint}/user-profile/${email}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  //get token
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
