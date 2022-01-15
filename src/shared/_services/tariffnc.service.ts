import { Injectable } from '@angular/core';
import { BehavService } from './behav.service';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// to find the current inputing network code isnumber and isredundant
export class TariffncService {
  constructor(private behav: BehavService) {}
  // col1: number = 0;
  // row1: any[] = [];
  // _isBoolean$ = new BehaviorSubject<Array<any>>([this.row1]);
  // isBoolean$ = this._isBoolean$.asObservable();
  // getData(event: any, row: any, col: any) {
  //   const value = event.target.value;
  //   if (col === 3) {
  //     //network code checking
  //     if (Number(value)) {
  //       //if number
  //       if (this.row1 !== [] && this.row1.includes(row)) {
  //         // checking row array
  //         this.row1.forEach((element: any, index: number) => {
  //           if (element === row) {
  //             //delete the row of item which was string replaced with number
  //             this.row1.splice(index, 1);
  //             this._isBoolean$.next(this.row1);
  //           }
  //         });
  //       } else {
  //         //  number
  //         this.behav._behavalue.value[row][col] = value;
  //       }
  //     } else {
  //       //nan
  //       this.col1 = col;
  //       this.row1.push(row);
  //       this._isBoolean$.next(this.row1);
  //       alert('Please enter a valid Network Code !');
  //     }
  //   } else if (col !== 3) {
  //     //not network code
  //     this.behav._behavalue.value[row][col] = value;
  //   }
  // }

  // finfing redundant values
  toFindDuplicates() {
    let arry: any[] = [];
    let index: any[] = [];
    this.behav._behavalue.value.forEach((item: any, index: any) => {
      arry.push([item['4network_code']]);
    });
    const count = (item: any) =>
      arry.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});

    const duplicates = (dict: { [x: string]: number }) =>
      Object.keys(dict).filter((a) => dict[a] > 1);
    duplicates(count(arry)).filter(
      (
        item //getting index of redundant values
      ) =>
        arry.reduce((a, e, i) => {
          if (e == item) {
            index.push(i);
          }
        }, 0)
    );
    return index;
  }

  tofindisnumber() {
    let arry: any[] = [];
    let index: any[] = [];
    this.behav._behavalue.value.forEach((item: any, index: any) => {
      arry.push([item['4network_code']]);
    });

    // arry.filter(item => {
    arry.reduce((a, e, i) => {
      if (!Number(e)) {
        console.warn();

        index.push(i);
      }
    }, 0);
    return index;

    // })
  }
}
