import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  userData = {};

  constructor(private storageService: StorageService) {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
    });
  }

  ngOnInit() {
  }

  public balance = [
    {
      amount: 1234,
      label: '充值余额',
    },
    {
      amount: 1234,
      label: '赏金余额',
    },
    {
      amount: 1234,
      label: '提现总额',
    },
    {
      amount: 1234,
      label: 'GXB',
    },
  ];

  public features = [
    {
      link: '/myposts',
      img: '../assets/img/bag.png',
      name: '发布管理',
    },
    {
      link: '/mytasks',
      img: '../assets/img/flag.png',
      name: '接单管理',
    },
    {
      link: '/me/finance',
      img: '../assets/img/note.png',
      name: '财务管理',
    },
    {
      link: '/bids',
      img: '../assets/img/wallet.png',
      name: '首页竞价',
    },
    {
      link: '/topup',
      img: '../assets/img/land.png',
      name: '充值',
    },
    {
      link: '/vip',
      img: '../assets/img/equity.png',
      name: '开通会员',
    },
    {
      link: '/bonus',
      img: '../assets/img/equity.png',
      name: '全分分红',
    },
    {
      link: '/report',
      img: '../assets/img/equity.png',
      name: '举报维权',
    },
    {
      link: '/signin',
      img: '../assets/img/equity.png',
      name: '我的会员',
    },
    {
      link: '/refer',
      img: '../assets/img/equity.png',
      name: '推广',
    },
  ];
  public system = [
    {
      link: '/mytasks',
      img: '../assets/img/bag.png',
      name: '联系客服',
    },
    {
      link: '/signin',
      img: '../assets/img/flag.png',
      name: '服务协议',
    },
    {
      link: '/signin',
      img: '../assets/img/note.png',
      name: '隐私条款',
    },
    {
      link: '/signin',
      img: '../assets/img/wallet.png',
      name: '常见问题',
    },
    {
      link: '/signin',
      img: '../assets/img/wallet.png',
      name: '关于我们',
    },
  ];
}
