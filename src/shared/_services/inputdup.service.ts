import { Injectable } from '@angular/core';
import { tariff } from '../interface/tariff';

@Injectable({
  providedIn: 'root'
})
export class InputdupService {

  constructor() { }
  // input duplicate entries network code.
  finddup(arr: any){
    console.warn(arr);
    
    // arr.array.forEach((item:[],index:number) => {
    //   console.warn("inputdp : "+item);
    // });
}
}
