import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Data {
    [propName: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Data) {
    this.messageSource.next(message);
  }

}
