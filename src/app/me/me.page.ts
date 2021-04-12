import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  url = environment.url;
  userData: Data;
  user: Data;
  message: Data;
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
      name: '全民分红',
    },
    {
      link: '/report',
      img: '../assets/img/equity.png',
      name: '举报维权',
    },
    {
      link: '/me/coupon',
      img: '../assets/img/equity.png',
      name: '我的红包',
    },
    {
      link: '/refer',
      img: '../assets/img/equity.png',
      name: '推广',
    },
  ];
  public system = [
    {
      link: '/support',
      img: '../assets/img/bag.png',
      name: '联系客服',
    },
    {
      link: '/terms',
      img: '../assets/img/flag.png',
      name: '服务协议',
    },
    {
      link: '/privacy',
      img: '../assets/img/note.png',
      name: '隐私条款',
    },
    {
      link: '/faq',
      img: '../assets/img/wallet.png',
      name: '常见问题',
    },
    {
      link: '/about',
      img: '../assets/img/wallet.png',
      name: '关于我们',
    },
  ];

  constructor(
      public navCtrl: NavController,
      private router: Router,
      private data: DataService,
      private httpService: HttpService,
      private storageService: StorageService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
              console.log(this.userData);
              this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
                  this.user = res1;
                  this.user.total = this.user.earnings + this.user.topup + this.user.frozen;
                  this.user.availableBalance = this.user.earnings + this.user.topup;
                  console.log(this.user);
                  this.message.user = this.user;
                  this.data.changeMessage(this.message);
              });
          },
          (rej) => {
              this.user = {};
              delete this.userData;
              // delete this.user;
          }
      );
  }

  ionViewDidEnter(){
  }

  ionViewWillLeave(){
  }

  go(){
      this.navCtrl.navigateForward('/topup');
      // this.navCtrl.navigateRoot('/topup');
  }
}
