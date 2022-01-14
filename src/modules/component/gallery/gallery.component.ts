import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/shared/_services/user.service';
import { AuthService } from 'src/shared/_services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  imageList: any = [];
  rowindex: any = [];
  imageListUser: any = [];
  show: boolean = false;
  // close span
  open() {
    this.show = false;
  }
  close() {
    this.show = true;
  }

  constructor(private user: UserService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user.imagedetailsList.snapshotChanges().subscribe((res) => {
      this.imageList = res.map((item) => {
        if (item.payload.val().user === sessionStorage.getItem('username')) {
          return item.payload.val().imgurl;
        }
      });
      this.rowindex = Array.from(
        Array(Math.ceil(this.imageList.length + 1 / 3)).keys()
      );

      this.imageListUser = this.imageList.filter(function (list: any) {
        return list != null;
      });
    });
  }
}
