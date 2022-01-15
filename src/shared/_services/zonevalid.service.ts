import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehavService } from './behav.service';
import { ZonebehavService } from './zonebehav.service';

@Injectable({
  providedIn: 'root',
})
export class ZonevalidService {
  public _zonevalidvalue = new BehaviorSubject<any[]>([] as any);
  _zonevalidvalue$=this._zonevalidvalue.asObservable();
  constructor(
    private zonebehav: ZonebehavService,
    private tariff: BehavService
  ) {}
  // changeValue(zone: any) {
  //   // this._zonevalidvalue.next(zone);
  //   // console.warn("beh : "+JSON.stringify(this._zonebehavalue.value));
  // }

  validzone() {
    let arry: any[] = [];
    let zonearr: any[] = [];
    // let zoneindex: any[] = [];
    const zone = this.zonebehav._zonebehavalue.getValue();
    const tariff_zone = this.tariff._behavalue.getValue();
    this.zonebehav._zonebehavalue.value.forEach((item: any, index: any) => {
      zonearr.push(item['zone_details'].zone_name);
    });
   
    this.tariff._behavalue.value.forEach((item: any, index: any) => {
      arry.push(item['1zone']);
    });
  
 const index=arry.filter(x => !zonearr.includes(x)
 );
//  index.filter(
//   (
//     item //getting index of redundant values
//   ) =>
//     arry.reduce((a, e, i) => {
//       if (e == item) {
//         console.warn(e,item);
        
//         zoneindex.push(i);
//       }
//     }, 0)
// );
console.warn("zone not present elements"+index);
this._zonevalidvalue.next(index);    // console.warn("details "+JSON.stringify(zone),tariff_zone);
  }
}
