import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'https://serene-hollows-11661.herokuapp.com/api/v1/upload';// url upload

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

// upload file

 Uploadfile(data:any): Observable<any> {
    return this.http.post<any>(API_URL,data,{
        reportProgress: true,
        observe: 'events'
     } );
  }


// get

}


