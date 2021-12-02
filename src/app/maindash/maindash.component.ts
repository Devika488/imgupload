import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
// import { Observable } from 'rxjs';
@Component({
  selector: 'app-maindash',
  templateUrl: './maindash.component.html',
  styleUrls: ['./maindash.component.scss']
})
export class MaindashComponent implements OnInit {
  islogined:any=true;

  constructor(private auth:AuthService) { }
  ngOnInit(): void {
    // this.isLoggedIn$ = this.auth.isLoggedIn; 
  }
 
  
}
