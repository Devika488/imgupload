import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { user } from './signdash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signindash',
  templateUrl: './signindash.component.html',
  styleUrls: ['./signindash.component.scss']
})
export class SignindashComponent implements OnInit {

  userobj:user=new user;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private fb:FormBuilder, private authservice:AuthService,private router:Router) { }
 
  ngOnInit(): void {
  }
  userdetails:FormGroup=this.fb.group({
email:['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
password:['',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]],
cpassword:['']
});
registerUser() {
  console.warn(this.userdetails.value);
  
  this.userobj.email=this.userdetails.value.email;
  this.userobj.password=this.userdetails.value.password;
  console.warn(this.userobj);
  
  this.authservice.signUp(this.userobj).subscribe((res) => {
    if (res.result) {
      this.userdetails.reset()
      this.router.navigate(['/login']);
    }
    console.warn("res :"+res);
    
    return res;
  })
}
} 
