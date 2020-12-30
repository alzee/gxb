import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public sorts= [
    {
      value: 'all',
      label: '悬赏大厅',
    },
    {
      value: 'date',
      label: '最新任务',
    },
    {
      value: 'price',
      label: '高价任务',
    },
  ];
  public cate = [
    '下载APP',
    '账号注册',
    '认证绑卡',
    '电商相关',
    '简单关注',
    '简单转发',
    '投票/砍价',
    '推广引流',
    '其它任务',
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

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };
}
