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

    zonename.id = this.zone_details.length;
    zonename.zone = this.network_details.get('zone')?.value;
    zonename.price = this.network_details.get('price')?.value;

    this.zone_details.push(zonename);
    this.network_details.reset();
  }

  del(id: number) {
    this.zone_details.forEach((item, index) => {
      if (item.id == id) {
        this.zone_details.splice(index, 1);
      }
    });
  }
}
