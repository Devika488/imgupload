import { Injectable } from '@angular/core';
import { BehavService } from './behav.service';
import { ZonebehavService } from './zonebehav.service';

@Injectable({
  providedIn: 'root',
})
export class InputdupService {
  constructor(
    private behav: BehavService,
    private zonebehav: ZonebehavService
  ) {}
  // checking zone values and inc
  tofindemptyopr() {
    let arry: any[] = [];
    this.behav._behavalue.value.forEach((item: any, index: any) => {
      if (item['3network_operator']===null||item['3network_operator']==="") {        
        arry.push(index);
      }
    });

    return arry;
  }
  tofindemptycount() {
    let arry: any[] = [];
    this.behav._behavalue.value.forEach((item: any, index: any) => {
      if (item['2country']===null||item['2country']==="") {        
        arry.push(index);
      }
     
    });

    // arry = arry.filter((x) => x == '');
    // console.warn('index:' + arry);

    return arry;
  }
  tofindincvalue() {
    let arry: any[] = [];
    let index: any[] = [];
    this.behav._behavalue.value.forEach((item: any, index: any) => {
      arry.push([item['5increment_type']]);
    });
    arry.reduce((a, e, i) => {
      if (
        !(
          e.toString().toLowerCase() == 'kb' ||
          e.toString().toLowerCase() == 'mb'
        )
      ) {
        index.push(i);
      }
    }, 0);
    return index;
  }

  // checking any empty field
  export() {
    const zone = [
      { 'Network_Details ': this.zonebehav._zonebehavalue.getValue() },
    ];
    const tariff = [{ 'Tariff ': this.behav._behavalue.getValue() }];
    const obj = [...zone, ...tariff];
    console.log('zone' + JSON.stringify(obj));
  }
}
