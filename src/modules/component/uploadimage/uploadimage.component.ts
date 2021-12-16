import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/shared/_services/user.service';
import { browserRefresh } from 'src/app/app.component';
import { AuthService } from 'src/shared/_services/auth.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.scss']
})
export class UploadimageComponent implements OnInit {
 constructor(
    private fb: FormBuilder,
    private user: UserService,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private router:Router
  ) {}

  // form = new FormData();
  progressValue!: AngularFireUploadTask;
  reportProgress: boolean = false;
  uploadfail: boolean = false;
  uploadProgress!:Observable<number|undefined>;
  progressInfo: string = '';
  browserRefresh: boolean = false;
  imgSrc: String = '../../../assets/images/imgupload.jpg';

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', this.browserRefresh);
    if (this.browserRefresh) {
      console.warn(sessionStorage.getItem('username'));
      console.warn(sessionStorage.getItem('access_token'));

      this.auth.doLogout();
    }
  }
  file: any = null;
  filename: any = null;
  uploadfile: FormGroup = this.fb.group({
    imgurl: ['', Validators.required],
    user: ['', Validators.required],
  });

  // get file
  onImageChange(event: any) {
    // const read= new FileReader;
    const file: File = event.target.files[0];
    if (file) {
      console.warn(file);
      console.warn(file.name);
      this.filename = file.name;
      this.file = file;
     
      // for file preview use filereader ,then we can
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgSrc = reader.result as string;
        // console.warn( reader.result as string);
      };
      this.uploadfile.patchValue({user:sessionStorage.getItem('username')});
      console.warn(this.uploadfile.value);
      
    } else {
      this.imgSrc = '../../../assets/images/imgupload.jpg';
    }
  }

  // file upload
  upload(formvalue: any) {
    if (this.uploadfile.valid) {
      console.warn('file :' + this.file);
      console.warn('formvalue : ' + JSON.stringify(formvalue));
      this.uploadfail = false;
      let filepath = `${sessionStorage.getItem('username')}/${this.filename
        .split('.')
        .slice(0, 1)}_${new Date().getTime()}`;
      const fileref = this.storage.ref(filepath);

      this.progressValue = this.storage.upload(filepath, this.file); //for getting progress value assigned value to progressValue:AngularFireUploadTask then use that value for snapshotchanges
      this.reportProgress = true;
      this.progressInfo = this.filename;
      this.uploadProgress = this.progressValue.percentageChanges();

      this.progressValue
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileref.getDownloadURL().subscribe((url) => {
              console.warn('url : ' + url);
              formvalue['imgurl'] = url;
              this.user.insertimagedetails(formvalue);
              // <---reset
              this.filename = null;
              this.file = null;
              this.uploadfile.reset();
              this.imgSrc = '../../../assets/images/imgupload.jpg';
              
              this.reportProgress = false;
              this.router.navigate(['/gallery']);

              // reset--->
            });
            console.warn('file ref : ' + this.storage.ref(filepath));
          })
        )
        .subscribe(
          (res) => {},
          (err) => {
            // <---reset
            this.reportProgress = false;
            this.filename = null;
            this.file = null;
            this.uploadfile.reset();
            // reset--->

            this.imgSrc = '../../../assets/images/imgupload.jpg';
            this.uploadfail = true;
            setInterval(() => {
              this.uploadfail = false;
            }, 5000);
          }
        );
    } else {
      this.uploadfile.reset();
      this.imgSrc = '../../../assets/images/imgupload.jpg';
      this.uploadfail = true;
      setInterval(() => {
        this.uploadfail = false;
      }, 5000); // an if condition for upload fail message
    }
  }
}
