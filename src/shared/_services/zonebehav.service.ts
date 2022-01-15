import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ZonebehavService {
  public _zonebehavalue = new BehaviorSubject<any>([] as any);
  _zonebehavalue$ = this._zonebehavalue.asObservable();
  constructor() {}
  changeValue(arr: any) {
    this._zonebehavalue.next(arr);
    // console.warn("beh : "+JSON.stringify(this._zonebehavalue.value));
  }
}
