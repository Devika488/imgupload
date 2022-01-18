import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BehavService {
  constructor() {}
  public _behavalue = new BehaviorSubject<any>([]);
  behavalue$ = this._behavalue.asObservable();

  changeValue(arr: any) {
    this._behavalue.next(arr);
  }
}
