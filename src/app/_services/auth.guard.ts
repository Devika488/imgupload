import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.auth.isLoggedIn()){
        console.warn("login authn guard");
        
        return true;
      }
      console.warn("can't login authn guard");
      window.alert('You don\'t have permission to view this page');
      this.router.navigateByUrl('login')
      return false;
    }
  
}
