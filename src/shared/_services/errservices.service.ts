import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrServicesService {
  constructor() {}

  // constructor(private toast:ToastrService) { }
  private _message: string = '';

  get message(): string {
    const returnedMessage = this._message.replace(/^"(.*)"$/, '$1');
    // this.clear();
    console.warn('get' + returnedMessage);

    return returnedMessage;
  }

  set message(val: string) {
    this._message = JSON.stringify(val);
  }

  clear() {
    this.message = '';
  }
}
