import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.page.html',
  styleUrls: ['./bids.page.scss'],
})
export class BidsPage implements OnInit {
  bids = [];
  buyItNow: number = 99;
  date: Date = new Date();
  today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
  min: number = 19;
  bids0 = [
    {
      "bid": 99,
      "price": 300
    },
    {
      "bid": 99,
      "price": 260
    },
    {
      "bid": 99,
      "price": 220
    },
    {
      "bid": 99,
      "price": 180
    },
  ];

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
      for (let i = 0; i < 4; i++){
          this.httpService.get(`bids?page=1&itemsPerPage=1&position=${i+1}&order%5Bdate%5D=desc&date%5Bafter%5D=${this.today}`).subscribe((res) => {
              this.bids[i] = res[0];
              console.log(this.bids);
          });
      }
  }

}
