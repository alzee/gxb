import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public hists = [
    {
      date: '2020-11-22',
      amount: '123.55',
    },
    {
      date: '2020-11-22',
      amount: '123.55',
    },
    {
      date: '2020-11-22',
      amount: '123.55',
    },
    {
      date: '2020-11-22',
      amount: '123.55',
    },
  ];

}
