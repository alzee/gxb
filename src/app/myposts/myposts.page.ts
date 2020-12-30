import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss'],
})
export class MypostsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public statuses = [
    {
      value: 'all',
      label: '全部',
    },
    {
      value: 'published',
      label: '已上架',
    },
    {
      value: 'paused',
      label: '已暂停',
    },
    {
      value: 'prePub',
      label: '待上架',
    },
    {
      value: 'done',
      label: '已完成',
    },
  ];

  public actions = [
    {
      value: 'review',
      label: '审核',
    },
    {
      value: 'edit',
      label: '修改',
    },
    {
      value: 'pause',
      label: '暂停',
    },
    {
      value: 'unPublish',
      label: '下架',
    },
    {
      value: 'sticky',
      label: '置顶',
    },
    {
      value: 'promo',
      label: '推荐',
    },
  ];

  public tasks = [
    {
      title: '分分钟钟搞定 秒审核',
      price: 2,
      quantity: 10,
      remain: 5,
      doing: 5,
      preReview: 3,
      done: 2,
      failed: 2,
      link: '/signin',
    },
    {
      title: '分分钟钟搞定 秒审核',
      price: 2,
      quantity: 10,
      remain: 5,
      doing: 5,
      preReview: 3,
      done: 2,
      failed: 2,
      link: '/signin',
    },
    {
      title: '分分钟钟搞定 秒审核',
      price: 2,
      quantity: 10,
      remain: 5,
      doing: 5,
      preReview: 3,
      done: 2,
      failed: 2,
      link: '/signin',
    },
    {
      title: '分分钟钟搞定 秒审核',
      price: 2,
      quantity: 10,
      remain: 5,
      doing: 5,
      preReview: 3,
      done: 2,
      failed: 2,
      link: '/signin',
    },
    {
      title: '分分钟钟搞定 秒审核',
      price: 2,
      quantity: 10,
      remain: 5,
      doing: 5,
      preReview: 3,
      done: 2,
      failed: 2,
      link: '/signin',
    },
  ];

}
