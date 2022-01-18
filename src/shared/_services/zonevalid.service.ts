import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehavService } from './behav.service';
import { ZonebehavService } from './zonebehav.service';

@Injectable({
  providedIn: 'root',
})
export class ZonevalidService {
  public _zonevalidvalue = new BehaviorSubject<any[]>([] as any);
  _zonevalidvalue$ = this._zonevalidvalue.asObservable();
  constructor(
    private zonebehav: ZonebehavService,
    private tariff: BehavService
  ) {}

  validzone() {
    let arry: any[] = [];
    let zonearr: any[] = [];
    const zone = this.zonebehav._zonebehavalue.getValue();
    const tariff_zone = this.tariff._behavalue.getValue();
    this.zonebehav._zonebehavalue.value.forEach((item: any, index: any) => {
      zonearr.push(item['zone_details'].zone_name);
    });

    this.tariff._behavalue.value.forEach((item: any, index: any) => {
      arry.push(item['1zone']);
    });

    const index = arry.filter((x) => !zonearr.includes(x));

    this._zonevalidvalue.next(index);
  }
}
