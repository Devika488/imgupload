import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/shared/_services/user.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  imageList: any = [];
  rowindex: any = [];

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.imagedetailsList.snapshotChanges().subscribe((res) => {
      this.imageList = res.map((item) => {
        if (item.payload.val().user === sessionStorage.getItem('username')) {
          console.warn('payload ' + item.payload.val().user);
          return item.payload.val().imgurl;
        }
      });
      this.rowindex = Array.from(
        Array(Math.ceil(this.imageList.length / 3)).keys()
      );
      console.warn("imageList : "+JSON.stringify(this.imageList));
      
    });
  }
}
