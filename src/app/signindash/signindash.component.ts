import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-signindash',
  templateUrl: './signindash.component.html',
  styleUrls: ['./signindash.component.scss']
})
export class SignindashComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
 
  ngOnInit(): void {
  }
  userdetails:FormGroup=this.fb.group({
email:['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
password:['',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]],
cpassword:['']


})
};
