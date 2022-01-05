import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/_services/auth.service';
import { ErrServicesService } from 'src/shared/_services/errservices.service';
import { user } from 'src/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private errservice: ErrServicesService
  ) {}
  userobj: user = new user();
  errmsg: string = '';
  islogin: boolean = false;
  getloggin: any = true;
  valueclear: boolean = false;
  valueclearpwd: boolean = false;
  mobile: boolean = true;
  signinForm: FormGroup = this.fb.group({
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
  });
  ngOnInit(): void {}

  ifformfocus() {}
  // input
  iffocus() {
    this.valueclear = this.signinForm.value.email == '' ? false : true;
  }
  //  pwd
  iffocuspwd() {
    this.valueclearpwd = this.signinForm.value.password == '' ? false : true;
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe(
      (res: any) => {
        this.userobj.email = this.signinForm.value.email;
        this.userobj.password = this.signinForm.value.password;
        this.userobj.token = res.token;
        sessionStorage.setItem('access_token', res.token);
        sessionStorage.setItem('username', this.signinForm.value.email);

        //data stored into session storage this code works but can't get the data use Json parse in auth service.if parse is used the pgm won't work
        sessionStorage.setItem('user',JSON.stringify(this.userobj));
        // console.warn(sessionStorage.getItem('user'));

        this.islogin = false;

        this.authService.currentUser = res;

        this.router.navigate(['/gallery']);
      },
      (err) => {
        this.errmsg = this.errservice.message;
        this.islogin = true;
        setTimeout(() => {
          this.islogin = false;
        }, 5000);
      }
    );
  }
}
