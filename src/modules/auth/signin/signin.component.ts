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


  ifformfocus(){
   
  }
  // input
  iffocus(){
    this.valueclear= (this.signinForm.value.email==''?false:true);
    
   }
  //  pwd
     iffocuspwd(){
      this.valueclearpwd= (this.signinForm.value.password==''?false:true);
     }


  loginUser() {
    this.authService.signIn(this.signinForm.value)  .subscribe((res: any) => {
      sessionStorage.setItem('access_token', res.token);
      sessionStorage.setItem('username',this.signinForm.value.email)
      this.islogin=false;
    
      this.authService.currentUser = res;
    
      
      this.router.navigate(['/gallery']);
      

     
    
    },err=>{

      this.islogin=true;

      setInterval(()=>{this.islogin=false;
        
      },10000);
 
    }
    );
  }
}
