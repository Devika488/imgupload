import { Injectable } from '@angular/core';
import { tariff } from '../interface/tariff';

@Injectable({
  providedIn: 'root'
})
export class InputdupService {

  constructor() { }
  // checking zone values and inc
  finddup(arr: any){
    console.warn(arr);
    
    // arr.array.forEach((item:[],index:number) => {
    //   console.warn("inputdp : "+item);
    // });
}
}
