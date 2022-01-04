import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrServicesService {
  constructor() {}

  private _message: string = '';

  get message(): string {
    const returnedMessage = this._message.replace(/^"(.*)"$/, '$1');

    return returnedMessage;
  }

  set message(val: string) {
    this._message = JSON.stringify(val);
  }

}
