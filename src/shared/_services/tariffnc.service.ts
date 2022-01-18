import { Injectable } from '@angular/core';
import { BehavService } from './behav.service';

@Injectable({
  providedIn: 'root',
})

// to find the current inputing network code isnumber and isredundant
export class TariffncService {
  constructor(private behav: BehavService) {}

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

    arry.reduce((a, e, i) => {
      if (!Number(e)) {
        console.warn();

        index.push(i);
      }
    }, 0);
    return index;
  }
}
