import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zone } from 'src/shared/models/zone';
import { ZonebehavService } from 'src/shared/_services/zonebehav.service';

@Component({
  selector: 'app-zonedetails',
  templateUrl: './zonedetails.component.html',
  styleUrls: ['./zonedetails.component.scss'],
})
export class ZonedetailsComponent implements OnInit {
  zone_detail: any[] = [];

  constructor(private fb: FormBuilder,private behav:ZonebehavService) {}

  ngOnInit(): void {}
  network_details: FormGroup = this.fb.group({
    id:['',Validators.required],
    network_operator:[''],
   zone_details:this.fb.group({
    zone_name: ['',[ Validators.required,Validators.pattern(/^(Zone)+\s[1-9]+$/)]],
    zone_price: ['', [Validators.required,Validators.pattern(/^[+-]?([1-9]+\.?[0-9]*|\.[0-9]+)$/)]],
   })
  });
  add() {
    let zonename = Object.create(zone);
    this.network_details.patchValue({
      id:this.zone_detail.length
    });
    zonename.id = this.zone_detail.length;
    zonename.network_operator=this.network_details.get('network_operator')?.value;
    zonename.zone_name = this.network_details.get('zone_details.zone_name')?.value;
    zonename.zone_price = this.network_details.get('zone_details.zone_price')?.value;

    this.zone_detail.push(zonename);
    console.warn(this.zone_detail);
    
    this.behav.changeValue(this.zone_detail);
    this.network_details.reset();
  }

  del(id: number) {
    this.zone_detail.forEach((item, index) => {
      if (item.id == id) {
        this.zone_detail.splice(index, 1);
      }
    });
    this.behav.changeValue(this.zone_detail);

  }
  arrayclear(){
    this.zone_detail=[];
    this.behav.changeValue(this.zone_detail);

  }
}
