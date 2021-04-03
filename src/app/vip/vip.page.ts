import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.page.html',
  styleUrls: ['./vip.page.scss'],
})
export class VipPage implements OnInit {
  vip = [
    {
      label: 'V1体验卡2天',
      price: 10,
    },
    {
      label: 'V2周卡7天',
      price: 28,
    },
    {
      label: 'V3月卡30天',
      price: 68,
    },
    {
      label: 'V4季卡90天',
      price: 188,
    },
    {
      label: 'V5年卡360天',
      price: 688,
    },
    {
      label: 'V6银卡720天',
      price: 1288,
    },
    {
      label: 'V7金卡1080天',
      price: 1688,
    },
    {
      label: 'V8钻卡1800天',
      price: 2688,
    },
  ];

  constructor() { }

  ngOnInit() {
  }
}
