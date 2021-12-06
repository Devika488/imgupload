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
// access token in localstorage checking
isLoggedIn(){
  return this.auth.isLoggedIn();
}

  //Log Out -clear token from local storage
  logout(){
    this.auth.doLogout();
  }
  
}
