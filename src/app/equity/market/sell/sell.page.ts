import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  quantity: number;
  price: number;

  constructor() { }

  ngOnInit() {
  }

}
