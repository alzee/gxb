import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-bids',
  templateUrl: './bids.page.html',
  styleUrls: ['./bids.page.scss'],
})
export class BidsPage implements OnInit {
  bids = [];
  date: Date;
  buyItNow: number;
  today: string;
  min: number;
  query = 'page=1&itemsPerPage=1&order%5Bdate%5D=desc';
  node: Data;

  constructor(
      private httpService: HttpService
  ) {
      this.buyItNow = 99;
      this.date = new Date();
      this.today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
      this.min = 19;
  }

  ngOnInit() {
          this.httpService.get('nodes/10').subscribe((res) => {
              this.node = res;
          });
  }

  ionViewWillEnter(){
      for (let i = 0; i < 4; i++){
          this.httpService.get(
              `bids?${this.query}&position=${i}&date%5Bafter%5D=${this.today}`
          ).subscribe((res) => {
              this.bids[i] = res[0];
              console.log(this.bids);
          });
      }
  }

}
