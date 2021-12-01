import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { user } from './signdash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signindash',
  templateUrl: './signindash.component.html',
  styleUrls: ['./signindash.component.scss'],
})
export class SignindashComponent implements OnInit {
  userobj: user = new user();

  // isSuccessful = false;
  isSignUpFailed: boolean = false;

  // errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  userdetails: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
    cpassword: [''],
  });

  registerUser() {
    console.warn(this.userdetails.value);

    this.userobj.email = this.userdetails.value.email;
    this.userobj.password = this.userdetails.value.password;
    console.warn(this.userobj);

    this.authservice.signUp(this.userobj).subscribe(
      (res) => {
        if (!res.error) {
          this.userdetails.reset();
          this.isSignUpFailed = false;
          console.warn(this.isSignUpFailed);

          this.router.navigate(['/login']);
        }

        // if(!res)
        // {
        //   console.warn("hi");

        //   this.isSignUpFailed=true;
        //   console.warn(this.isSignUpFailed);

        // }
        console.warn('res :' + JSON.stringify(res));

        return res;
      },
      (err) => {
        console.warn(err);

        this.isSignUpFailed = true;
        console.warn(this.isSignUpFailed);
      }
    );
  }
}
