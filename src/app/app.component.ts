import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
export let browserRefresh: boolean = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'imgupload';
  subscription: Subscription;
  constructor(private auth: AuthService, private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
      }
    });
  }
  // access token in localstorage checking
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  //Log Out -clear token from local storage
  logout() {
    this.auth.doLogout();
  }
}
