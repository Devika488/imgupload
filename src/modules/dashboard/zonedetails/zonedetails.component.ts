import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private behav: ZonebehavService,
    private valid: ZonevalidService,
    private tariff:BehavService
  ) {}

  ngOnInit(): void {}
  network_details: FormGroup = this.fb.group({
    id: ['', Validators.required],
    network_operator: [''],
    zone_details: this.fb.group({
      zone_name: [
        '',
        [Validators.required, Validators.pattern(/^(Zone)+\s[1-9]+$/)],
      ],
      zone_price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+-]?([1-9]+\.?[0-9]*|\.[0-9]+)$/),
        ],
      ],
    }),
  });
  add() {
    this.network_details.patchValue({
      id: this.zone_detail.length,
    });

    this.zone_detail.push(this.network_details.value);

    this.behav.changeValue(this.zone_detail);
    this.valid.validzone();
    // let name:string[]=[];
    // this.zone_detail.filter(item=>{name.push(item.zone_details.zone_name)
    // console.warn(name);
    // })

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
