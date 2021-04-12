import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  subscription: Subscription;
  message: Data;
  apply: Data;

  constructor(
      private data: DataService
  ) { }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      this.apply = this.message.apply;
      console.log(this.apply);
  }

}
