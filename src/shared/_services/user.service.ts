import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// const API_URL = 'https://serene-hollows-11661.herokuapp.com/api/v1/upload';// url upload
// const API_URL = 'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5' //third party
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private dtatbase:AngularFireDatabase) { }

// upload file

 Uploadfile() {
    // return this.http.post<any>(API_URL,data,{
    //     reportProgress: true,
    //     observe: 'events'
    //  } );
  }


// get

}


