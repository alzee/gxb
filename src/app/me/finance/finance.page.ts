import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  subtotal: number = 0;
  month: string;
  hists = [];

  constructor() {
    const d = new Date();
    this.month = d.getFullYear() + '-' + (d.getMonth() + 1);
  }

  ngOnInit() {
  }

  showMonth() {
    console.log(this.month);
  }
}
