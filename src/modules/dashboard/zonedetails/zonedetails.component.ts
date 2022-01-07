import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zone } from 'src/shared/models/zone';

@Component({
  selector: 'app-zonedetails',
  templateUrl: './zonedetails.component.html',
  styleUrls: ['./zonedetails.component.scss'],
})
export class ZonedetailsComponent implements OnInit {
  zone_details: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  network_details: FormGroup = this.fb.group({
    // id:['',Validators.required],
    zone: ['', Validators.required],
    price: ['', Validators.required],
    // price: ['0.00', Validators.required], //if it is default value
  });
  add() {
    let zonename = Object.create(zone);
    // console.warn(typeOf(zonename));

    zonename.id = this.zone_details.length + 1;
    zonename.zone = this.network_details.get('zone')?.value;
    zonename.price = this.network_details.get('price')?.value;
    this.network_details.patchValue({
      id:this.zone_details.length,
    });

    this.zone_details.push(zonename);
    this.network_details.reset();
    console.warn('array : ' + JSON.stringify(this.zone_details));
  }
  del(id: number) {
    console.warn('hi ' + id);
    // let newzone=[];
  
  this.zone_details.splice(id-1,1);
  console.warn(this.zone_details);
  
    // console.warn(this.zone_details.filter(item => { item.id!==id
    // }));

    console.warn(this.zone_details);
  }
}
