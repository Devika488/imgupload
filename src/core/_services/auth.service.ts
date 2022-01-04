import { Injectable } from '@angular/core';
import { user } from 'src/core/models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public content = new BehaviorSubject<any>(user);


  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: user): Observable<any> {
    let api = `${this.endpoint}/${apiPaths.signup}`;
    return this.http.post(api, user);
  }

  // Sign-in
  signIn(user: user) {
    // onDataReceived = (close: boolean) => this.content.next(user);
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
    let removeuser = sessionStorage.removeItem('user');
    if (removeToken == null && removeuser == null) {
      this.router.navigate(['/login']);
    }
  }
}
