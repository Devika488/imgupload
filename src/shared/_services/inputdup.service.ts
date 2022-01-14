import { Injectable } from '@angular/core';
import { BehavService } from './behav.service';

@Injectable({
  providedIn: 'root'
})
export class InputdupService {

  constructor(private behav:BehavService) { }
  // checking zone values and inc

tofindincvalue(){
  let arry: any[] = [];
  let index: any[] = [];
  this.behav._behavalue.value.forEach((item: any, index: any) => {
    arry.push([item['5increment_type']]);
  });
  arry.reduce((a, e, i) => {
    if (!(((e).toString().toLowerCase()=='kb')||((e).toString().toLowerCase()=='mb'))) {      
      // console.warn("i "+i);
      // if(true){
      index.push(i);
    }
  }, 0);
  // console.warn("index: "+index);
return index;

// })
}
// if(arry.includes("kb")){

// }  


//   finddup(arr: any){
//     console.warn(arr);
    
//     // arr.array.forEach((item:[],index:number) => {
//     //   console.warn("inputdp : "+item);
//     // });
// }
}
