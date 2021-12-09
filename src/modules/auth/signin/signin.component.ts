import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/_services/auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder,private router:Router) {}
  islogin:boolean=false;
  getloggin:any=true;
  valueclear:boolean=false;
  valueclearpwd:boolean=false;
  mobile:boolean=true;
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
  ngOnInit(): void {
  
  
  }

  @HostListener("window:resize", [])
  onResize() {
    var width = window.innerWidth;
    this.mobile = width < 992?false:true;
    console.warn(this.mobile);

    return this.mobile;
    
  }
  ifformfocus(){
   
  }
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
      sessionStorage.setItem('access_token', res.token);
      this.islogin=false;
      // console.warn("res :"+res);
      console.warn(JSON.stringify(res)); //undefined
      this.authService.currentUser = res;
      console.warn('inside signin ' + res);
      // this.getloggin=false;
      console.warn("getloggin in child:"+this.getloggin);
      
      this.router.navigate(['/user-profile']);
      

     
    
    },err=>{
      console.warn(err);

      this.islogin=true;

      setInterval(()=>{this.islogin=false;
        console.warn(this.islogin);
        
      },10000);
 
    }
    );
  }
}
