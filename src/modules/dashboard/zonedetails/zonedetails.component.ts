import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { BehavService } from 'src/shared/_services/behav.service';
import { ZonebehavService } from 'src/shared/_services/zonebehav.service';
import { ZonevalidService } from 'src/shared/_services/zonevalid.service';

@Component({
  selector: 'app-zonedetails',
  templateUrl: './zonedetails.component.html',
  styleUrls: ['./zonedetails.component.scss'],
})
export class ZonedetailsComponent implements OnInit {
  zone_detail: any[] = [];
  zonename: boolean = false; //zone name field empty
  zoneprice: boolean = false; //price empty
  zonevalid: boolean = false; //both
  zoneduplicate:boolean=false;//zone value exist
  constructor(
    private fb: FormBuilder,
    private behav: ZonebehavService,
    private valid: ZonevalidService,
    private tariff: BehavService
  ) {}
  ngOnInit(): void {}

  network_details: FormGroup = this.fb.group({
    id: [''],
    network_operator: [''],
    zone_details: this.fb.group({
      zone_name: [
        '',
        [Validators.required, Validators.pattern(/^(Zone)+\s[0-9]+$/)],
      ],
      zone_price: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]*)?$/)],
      ],
    }),
  });
  checkzonename() {
    this.zonename =
      this.network_details.get('zone_details.zone_name')?.value == ''
        ? false
        : true;
  }
  checkzoneprice() {
    this.zoneprice =
      this.network_details.get('zone_details.zone_price')?.value == ''
        ? false
        : true;
  }

  add() {
    let zoneneme: string[] = [];
    let x = 0;
    const val = this.network_details.get('zone_details.zone_name')?.value;
    if (this.network_details?.valid) {
      this.network_details.patchValue({
        id: this.zone_detail.length,
      });

      if (this.zone_detail.length != 0) {
        this.zone_detail.forEach((item) => {
          zoneneme.push(item['zone_details'].zone_name);
        });
        zoneneme.some((item) =>{
          if (item == val) {
            x = 1;
            this.zoneduplicate=true;
           setTimeout(() => {
            this.zoneduplicate=false;
           }, 1500);
            //  return true;
          }
         
        });
        if (x == 0) {
          this.adding();
        }
      } else {
        this.adding();
      }
    } else if (
      this.network_details.get('zone_details.zone_name')?.value == '' ||
      this.network_details.get('zone_details.zone_price')?.value == ''
    ) {
      this.zonevalid = true;
      setTimeout(() => {
        this.zonevalid = false;
      }, 1500);
    }
  }
  adding() {
    this.zone_detail.push(this.network_details.value);

    this.behav.changeValue(this.zone_detail);
    this.valid.validzone();

    this.network_details.reset();
  }

  del(id: number) {
    this.zone_detail.forEach((item, index) => {
      if (item.id == id) {
        this.zone_detail.splice(index, 1);
      }
    });
    this.behav.changeValue(this.zone_detail);
    this.valid.validzone();
  }
  arrayclear() {
    this.zone_detail = [];
    this.behav.changeValue(this.zone_detail);
  }
}
