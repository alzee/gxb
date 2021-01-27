import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  data = {};

  setData(data) {
      this.data = data;
  }

  getData(){
      return this.data;
  }

  constructor(private httpService: HttpService) {
      this.data = this.httpService.get('tasks');
  }
}
