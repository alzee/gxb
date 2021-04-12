import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Data {
    [propName: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject({
    orderData: {},
    postData: {},
    url: '',
    httpMethod: '',
    user: {},
    apply: {}
  });
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message);
  }

}
