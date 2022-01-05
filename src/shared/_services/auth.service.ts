import { Injectable } from '@angular/core';
import { user } from 'src/models/user';
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
  // curruser = new BehaviorSubject<user>(this.hasToken());

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
    let authToken =null;
    let user1=(sessionStorage.user);
    console.warn(user1);
if(user1){   
     authToken = JSON.parse(user1).token;
}
        
    // let authToken = sessionStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }


  // // 
  // private hasToken() : user {
  //   return localStorage.getItem('token');
  // }

  // check access token expire

  doLogout() {
    let removeToken = sessionStorage.removeItem('access_token');
    let removeuser = sessionStorage.removeItem('username');
    let removeUser = sessionStorage.removeItem('user');
    if (removeUser == null) {
      this.router.navigate(['/login']);
    }
  }
}
