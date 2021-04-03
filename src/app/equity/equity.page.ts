import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.page.html',
  styleUrls: ['./equity.page.scss'],
})
export class EquityPage implements OnInit {

  public features = [
    {
      link: '/equity/collect',
      img: '../assets/img/collect.png',
      name: '领股权',
    },
    {
      link: '/equity/exchange',
      img: '../assets/img/exchange.png',
      name: '兑股权',
    },
    {
      link: '/equity/market/my',
      img: '../assets/img/market.png',
      name: '交换市场',
    },
    {
      link: '/equity/meeting',
      img: '../assets/img/meeting.png',
      name: '股东大会',
    },
    {
      link: '/equity/topic',
      img: '../assets/img/talk.png',
      name: '股东话题',
    },
    {
      link: '/equity/ranking',
      img: '../assets/img/market.png',
      name: '排行榜'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
