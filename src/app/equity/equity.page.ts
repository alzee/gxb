import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.page.html',
  styleUrls: ['./equity.page.scss'],
})
export class EquityPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public features = [
    {
      link: '/mytasks',
      img: '../assets/img/collect.png',
      name: '领股权',
    },
    {
      link: '/signin',
      img: '../assets/img/exchange.png',
      name: '兑股权',
    },
    {
      link: '/signin',
      img: '../assets/img/market.png',
      name: '交换市场',
    },
    {
      link: '/signin',
      img: '../assets/img/meeting.png',
      name: '股东大会',
    },
    {
      link: '/signin',
      img: '../assets/img/talk.png',
      name: '股东话题',
    },
  ];
}
