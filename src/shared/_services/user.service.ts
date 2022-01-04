import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private datatbase: AngularFireDatabase
  ) {
    this.getimagedetails();
  }

  // upload file
  imagedetailsList!: AngularFireList<any>;
  username: any = sessionStorage.getItem('username');
  getimagedetails() {
    this.imagedetailsList = this.datatbase.list('imagedetail');
  }

  insertimagedetails(imagedetail: any) {
    this.imagedetailsList.push(imagedetail);
  }
}
