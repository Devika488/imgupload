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
    if (col === 3) {
      //network code checking
      if (Number(value)) {
        //if number
        if (this.row1 !== [] && this.row1.includes(row)) {
          // checking row array
          this.row1.forEach((element: any, index: number) => {
            if (element === row) {
              //delete the row of item which was string replaced with number
              this.row1.splice(index, 1);
              this._isBoolean$.next(this.row1);
            }
          });
        } else {
          //  number
          this.behav._behavalue.value[row][col] = value;
        }
      } else {
        //nan
        this.col1 = col;
        this.row1.push(row);
        this._isBoolean$.next(this.row1);
        alert('Please enter a valid Network Code !');
      }
    } else if (col !== 3) {
      //not network code
      this.behav._behavalue.value[row][col] = value;
    }
  }

  toFindDuplicates() {
    let arry: any[] = [];
    let index:any[]=[]
    this.behav._behavalue.value.forEach((item: any, index: any) => {
      arry.push([item[3]]);
    });
    const count = (item: any) =>
      arry.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // don't forget to initialize the accumulator

    const duplicates = (dict: { [x: string]: number }) =>
      Object.keys(dict).filter((a) => dict[a] > 1);
    duplicates(count(arry)).filter((item) =>
      arry.reduce( (a, e, i)=> {
        
        if (e == item) {

          index.push(i);
        }
      },0)
    );

    // console.log('arr' + index);
    return index;
  }
}
