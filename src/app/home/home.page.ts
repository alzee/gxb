import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public bids = [
    {
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
    },
    {
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
    },
    {
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
    },
    {
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
    },
  ];

  public tasks = [
    {
      boss: 'jess',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: ['reg'],
      sticky: true,
      price: 55.5,
    },
    {
      boss: 'mike',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: ['reg', 'save'],
      sticky: false,
      price: 55.5,
    },
  ];
}
