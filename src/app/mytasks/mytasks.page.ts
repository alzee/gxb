import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public tasks = [
    {
      boss: 'jess',
      avatar: '../assets/img/she.png',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: '简单关注',
      sticky: true,
      price: 55.5,
      tags: ['急速审核', '趣省钱'],
      date: '2020-11-11',
      link: '/detail',
    },
    {
      boss: 'mike',
      avatar: '../assets/img/she.png',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: '账号注册',
      sticky: false,
      price: 55.5,
      tags: ['急速审核', '趣省钱'],
      date: '2020-11-11',
      link: '/detail',
    },
  ];

  public statuses = [
    {
      value: 'all',
      label: '全部',
    },
    {
      value: 'preSubmit',
      label: '待提交',
    },
    {
      value: 'reviewing',
      label: '审核中',
    },
    {
      value: 'fail',
      label: '不合格',
    },
    {
      value: 'done',
      label: '已完成',
    },
  ];

}
