import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'imgupload';
  constructor(private auth:AuthService){}
// content need in authservice but can't do validation so use it here:-is login 
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  logout(){
    this.auth.doLogout();
  }
  
}
