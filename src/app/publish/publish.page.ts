import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  log(o) {
      console.log(o.el.className.indexOf('radio-checked'));
  }
  public cate = [
    {
      label: '下载APP',
      cate: 'app',
    },
    {
      label: '账号注册',
      cate: 'reg',
    },
    {
      label: '认证绑卡',
      cate: 'authen',
    },
    {
      label: '电商相关',
      cate: 'ecomm',
    },
    {
      label: '简单关注',
      cate: 'follow',
    },
    {
      label: '简单转发',
      cate: 'forward',
    },
    {
      label: '投票/砍价',
      cate: 'poll',
    },
    {
      label: '推广引流',
      cate: 'promo',
    },
    {
      label: '其它任务',
      cate: 'other',
    },
  ];

  public devices = ['全部', '安卓', '苹果'];
}
