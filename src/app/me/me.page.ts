import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Wechat } from '@ionic-native/wechat/ngx';

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
  authCode: Data;
  wxuserinfo: Data;
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
      img: '../assets/img/rmb0.png',
      name: '财务管理',
    },
    {
      link: '/bids',
      img: '../assets/img/reg.png',
      name: '首页竞价',
    },
    {
      link: '/topup',
      img: '../assets/img/land.png',
      name: '充值',
    },
    {
      link: '/vip',
      img: '../assets/img/search_people.png',
      name: '开通会员',
    },
    {
      link: '/bonus',
      img: '../assets/img/wallet.png',
      name: '全民分红',
    },
    {
      link: '/report/my',
      img: '../assets/img/speaker.png',
      name: '举报维权',
    },
    {
      link: '/me/coupon',
      img: '../assets/img/coupon.png',
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
      node: 3,
      img: '../assets/img/hotline.png',
      name: '联系客服',
    },
    {
      link: '/terms',
      node: 1,
      img: '../assets/img/flag.png',
      name: '服务协议',
    },
    {
      link: '/privacy',
      node: 2,
      img: '../assets/img/note.png',
      name: '隐私条款',
    },
    {
      link: '/faq',
      node: 4,
      img: '../assets/img/bookmark1.png',
      name: '常见问题',
    },
    {
      link: '/about',
      node: 5,
      img: '../assets/img/record.png',
      name: '关于我们',
    },
  ];

  constructor(
      private wechat: Wechat,
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
              this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
                  this.user = res1;
                  this.user.total = (this.user.earnings + this.user.topup + this.user.frozen) / 100;
                  this.user.availableBalance = (this.user.earnings + this.user.topup) / 100;
                  this.user.topup = this.user.topup / 100;
                  this.user.earnings = this.user.earnings / 100;
                  this.user.frozen = this.user.frozen / 100;
                  this.message = { // for /me/coupon
                      user: this.user
                  };
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

  auth() {
      /*
      const r = {
          code: '001TmIGa1Uth3B0CiVGa1D7UEs3TmIGB',
          uid: this.userData.id
      };
          this.httpService.post('wxauth', r).subscribe((res1) => {
              console.log(res1);
              this.wxuserinfo = res1;
              this.user.avatar = this.wxuserinfo.headimgurl;
          });
         */

      const scope = "snsapi_userinfo";
      const state = "_" + (+new Date());
      this.wechat.auth(scope, state).then((res) => {
          this.authCode = res;
          /*
          console.log('========Begin===========');
          console.log('code is:', this.authCode.code);
          console.log('errCode is:', this.authCode.ErrCode);
          console.log('state is:', this.authCode.state);
          console.log('land is:', this.authCode.lang);
          console.log('conntry is:', this.authCode.country);
          console.log('========End===========');
         */
          const postData = {
              code: this.authCode.code,
              uid: this.userData.id
          };
          this.httpService.post('wxauth/', postData).subscribe((res1) => {
              console.log(res1);
          });
      }, reason => {
          console.log('failed: ', reason);
      });
  }
}
