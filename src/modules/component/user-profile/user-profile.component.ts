import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/shared/_services/user.service';
import { browserRefresh } from 'src/app/app.component';
import { AuthService } from 'src/shared/_services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private auth: AuthService,
    private storage: AngularFireStorage,
  
  ) {}

  // form = new FormData();
  
  reportProgress: boolean = false;
  uploadfail: boolean = false;
  uploadProgress: number = 0;
  progressInfo: string = '';
  browserRefresh: boolean = false;
  imgSrc: String = '../../../assets/imgupload.jpg';

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', this.browserRefresh);
    if (this.browserRefresh) {
      this.auth.doLogout();
    }
  }
  file:any=null;
  filename: any = null;
  extension:any=null;
  uploadfile: FormGroup = this.fb.group({
    file: ['', Validators.required],
  });

  // get file
  onImageChange(event: any) {
    // const read= new FileReader;
    const file: File = event.target.files[0];
    if (file) {
      console.warn(file);
      console.warn(file.name);
      this.filename = file.name;
      this.extension=this.filename.split('.')[1];
      this.file=file;
  
      // for file preview use filereader ,then we can 
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgSrc = reader.result as string;
        console.warn( reader.result as string);
        
      };
    // event.target.id.src=URL.createObjectURL(file);   // correct it       
    } else {
      this.imgSrc = '../../../assets/imgupload.jpg';
    }
  }

  // file upload
  upload() {
    if (this.uploadfile.valid) {
      console.warn( "file :"+this.file);

      // this.reportProgress = true;
      // this.progressInfo = this.filename;
      this.uploadfail = false;
      let filepath = `images/${(this.filename.split('.').slice(0,1))}_${new Date().getTime()}.${this.extension}`;
      this.imgSrc = '../../../assets/imgupload.jpg';
      const fileref=this.storage.ref(filepath);
     
      this.storage
        .upload(filepath, this.file)
        .snapshotChanges()
        .pipe(
          finalize(()=>{
            fileref.getDownloadURL().subscribe(url=>{
              console.warn("url : "+url);


              // reset
              this.filename = null;
              this.file=null;
              this.extension=null;
                this.uploadfile.reset();
                this.imgSrc = '../../../assets/imgupload.jpg';


            })
            console.warn("file ref : "+this.storage.ref(filepath));
            
          })
        )
        .subscribe(
          // (res) => {
          //   // this.uploadProgress = Math.round(100 * (loaded / res.total));
          //   this.filename = '';
          //   this.uploadfile.reset();
          //   this.imgSrc = '../../../assets/imgupload.jpg';
          //   console.warn("res in upload :"+res);
            
          // },
          // (err) => {
          //   this.uploadfail = true;
          //   setInterval(() => {
          //     this.uploadfail = false;
          //   }, 5000); // an if condition for upload fail message
          // }
        );
   
    } else {
      this.imgSrc = '../../../assets/imgupload.jpg';
      this.uploadfail = true;
      setInterval(() => {
        this.uploadfail = false;
      }, 5000); // an if condition for upload fail message
    }
  }
}
