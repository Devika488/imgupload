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
  getloggin:any=true;
  valueclear:boolean=false;
  valueclearpwd:boolean=false;
  valuefocus:boolean=false;

  signinForm: FormGroup = this.fb.group({
    email: ['',
    [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$'),
    ]],
    password: ['',[
      Validators.required,
      Validators.pattern(
        '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{8,}'
      ),
    ]],
  });
  ngOnInit(): void {}
  // ifformfocus(){
  //   if(this.valueclear||this.valueclearpwd){

  //   }
  // }
  // input
  iffocus(){
    this.valueclear= (this.signinForm.value.email==''?false:true);
    console.warn(this.valueclear);
    
   }
  //  pwd
     iffocuspwd(){
      this.valueclearpwd= (this.signinForm.value.password==''?false:true);
      console.warn(this.valueclearpwd);
     }
  loginUser() {
    console.warn(this.signinForm.value);
    this.authService.signIn(this.signinForm.value)  .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.islogin=false;
      // console.warn("res :"+res);
      console.warn(JSON.stringify(res)); //undefined
      this.authService.currentUser = res;
      console.warn('inside signin ' + res);
      // this.getloggin=false;
      console.warn("getloggin in child:"+this.getloggin);
      
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
