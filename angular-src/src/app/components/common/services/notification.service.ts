import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor() { }
  
  show(msg, options) {
    alert(msg);
  }

}
