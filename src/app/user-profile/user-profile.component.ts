import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private fb:FormBuilder,private user:UserService) { }
   form=new FormData;
   reportProgress: boolean=false;
   uploadfail:boolean=false;
   uploadProgress:number=0;
   progressInfo:string='';
  ngOnInit(): void {
  }
  filename:any='';
  uploadfile:FormGroup=this.fb.group({
    file:['',Validators.required]
  })

  // get file 
  onImageChange(event:any){
    // const read= new FileReader;
   const file:File=event.target.files[0];
    if(file){
//       console.warn(file);
// console.warn(file.name);

this.filename=file.name;
this.form.append("image",this.filename);

    }
      
    
  }

// file upload
  upload(){
   if(this.filename!=''){
    this.reportProgress= true;
    this.progressInfo=this.filename;
    this.uploadfail=false;
    this.user.Uploadfile(this.form).subscribe(res=>{
      this.uploadProgress = Math.round(100 * (res.loaded / res.total));
      this.filename="";
      this.uploadfile.reset();
    },err=>{
      this.reportProgress=false;
      this.uploadfail=true;
     setInterval(()=>{
      this.uploadfail=false;
     },5000)  // an if condition for upload fail message 
    })
   }
    
  }

}
