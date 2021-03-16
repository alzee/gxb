import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.page.html',
  styleUrls: ['./bids.page.scss'],
})
export class BidsPage implements OnInit {
  bids = [
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

  constructor() { }

  ngOnInit() {
  }

}
