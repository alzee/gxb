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
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/signin',
    },
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/signin',
    },
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/signin',
    },
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/signin',
    },
  ];

  public features = [
    {
      link: '/mytasks',
      img: '../assets/img/bag.png',
      name: '悬赏管理',
    },
    {
      link: '/publish',
      img: '../assets/img/flag.png',
      name: '发布悬赏',
    },
    {
      link: '/myposts',
      img: '../assets/img/note.png',
      name: '发布管理',
    },
    {
      link: '/bonus',
      img: '../assets/img/wallet.png',
      name: '全民分红',
    },
    {
      link: '/land',
      img: '../assets/img/land.png',
      name: '我的领地',
    },
    {
      link: '/equity',
      img: '../assets/img/equity.png',
      name: '股权',
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
      link: '/signin',
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
      link: '/signin',
    },
  ];
}
