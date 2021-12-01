import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder,private router:Router) {}
  islogin:boolean=false;
  hehe: any;
  signinForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit(): void {}
  loginUser() {
    console.warn(this.signinForm.value);
    this.authService.signIn(this.signinForm.value)  .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.islogin=false;
      // console.warn("res :"+res);
      console.warn(JSON.stringify(res)); //undefined
      this.authService.currentUser = res;
      console.warn('inside signin ' + res);

      this.router.navigate(['/user-profile/' + this.signinForm.value.email]);

      // this.getUserProfile(res).subscribe((res) => {
      // })
    
    },err=>{
      console.warn(err);
      this.islogin=true;
      
    }
    );
  }
}
