import { Injectable } from '@angular/core';
import { BehavService } from './behav.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// to find the current inputing network code isnumber

export class TariffncService {
  constructor(private behav: BehavService) {}
  col1: number = 0;
  row1: any[] = [];
  _isBoolean$ = new BehaviorSubject<Array<any>>([this.row1]);
  isBoolean$ = this._isBoolean$.asObservable();
  getData(event: any, row: any, col: any) {
    const value = event.target.value;
    if (col === 3) {  //network code checking
      if (Number(value)) { //if number
        if (this.row1 !== [] && this.row1.includes(row)) { // checking row array 
          this.row1.forEach((element: any, index: number) => {
            if (element === row) { //delete the row of item which was string replaced with number 
              this.row1.splice(index, 1);
              this._isBoolean$.next(this.row1);
            }
          });
        } else {
          // check if network redundant or not here

          this.behav._behavalue.value[row][col] = value;
        }
      } else {
        this.col1 = col;
        this.row1.push(row);
        this._isBoolean$.next(this.row1);
        alert('Please enter a valid Network Code !');
      }
    } else if (col !== 3) {
      this.behav._behavalue.value[row][col] = value;
    }
  }
}
