import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  public stats = [
    {
      label: '保证金',
      value: 250,
    },
    {
      label: '发布任务',
      value: 50,
    },
    {
      label: '接任务',
      value: 150,
    },
    {
      label: '被投诉',
      value: 2,
    },
    {
      label: '申请',
      value: 20,
    },
  ];

  public tasks = [
    {
      boss: 'jess',
      avatar: '../assets/img/she.png',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: ['reg'],
      sticky: true,
      price: 55.5,
      link: '/detail',
    },
    {
      boss: 'mike',
      avatar: '../assets/img/she.png',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: ['reg', 'save'],
      sticky: false,
      price: 55.5,
      link: '/detail',
    },
  ];

  constructor() { }

  ngOnInit() {
  }
}
