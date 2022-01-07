import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/_services/auth.service';
import { user } from '../../../shared/models/user';
import { Router } from '@angular/router';
import { ErrServicesService } from 'src/shared/_services/errservices.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userobj: user = new user();
  errmsg:string='';
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  valueclear: boolean = false;
  valueclearpwd: boolean = false;
  passwordne: boolean = false;
  // errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private errservice:ErrServicesService
  ) {}

  ngOnInit(): void {}

  userdetails: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$'
        ),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{8,}'
        ),
      ],
    ],
    cpassword: ['', Validators.required],
  });

  iffocus() {
    this.valueclear = this.userdetails.value.email == '' ? false : true;
  }
  iffocuspwd() {
    this.valueclearpwd = this.userdetails.value.password == '' ? false : true;
  }
  ifpwdnot() {
    this.passwordne = this.userdetails.value.cpassword == '' ? false : true;
  }
  registerUser() {
    this.userobj.email = this.userdetails.value.email;
    this.userobj.password = this.userdetails.value.password;

    this.authservice.signUp(this.userobj).subscribe(
      (res) => {
        if (!res.error) {          
          this.userdetails.reset();
          this.isSignUpFailed = false;
          this.isSuccessful = true;
          setTimeout(() => {
            this.router.navigate(['/admin/login']);
          }, 3000);
        }
      }
      ,
      (err) => {
        this.errmsg=this.errservice.message;
        this.isSignUpFailed = true;
        setTimeout(() => {
          this.isSignUpFailed = false;
          this.userdetails.reset();
        }, 1500);
      }
    );
  }

}
