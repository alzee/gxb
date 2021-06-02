import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  form: FormGroup;
  topup = 0;
  earnings = 0;
  balance = 0;
  userData = {
      id: 0
  };
  user: Data;
  feeRate: number;
  fee: number;
  min = 1;
  conf: Data;
  actual: number;
  sum: number;
  authCode: Data;
  wxuserinfo: Data;

  constructor(
      public navCtrl: NavController,
      private Wechat: Wechat,
      public alertController: AlertController,
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private storageService: StorageService,
      private toastService: ToastService
  ) {}

  ngOnInit(){
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              this.feeRate = this.user.level.withdrawFee;
              this.topup = this.user.topup / 100;
              this.earnings = this.user.earnings / 100;
              if (this.user.wechat) {
                  this.wechat.setValue(this.user.wechat);
                  this.wechat.disable();
              }
              else {
                  this.user.wechat = '';
              }

              if (this.user.alipay) {
                  this.alipay.setValue(this.user.alipay);
                  this.alipay.disable();
              }
              else {
                  this.user.alipay = '';
              }
          });
      });

      this.form = this.formBuilder.group({
          type: [],
          amount: [],
          method: [],
          wechat: [],
          alipay: []
      });
  }

  get amount(){
      return this.form.get('amount');
  }

  get type(){
      return this.form.get('type');
  }

  get method(){
      return this.form.get('method');
  }

  get wechat(){
      return this.form.get('wechat');
  }

  get alipay(){
      return this.form.get('alipay');
  }

  withdraw(){
      const data = {
          uid: this.userData.id,
          type: 19,
          amount: +(this.actual * 100).toFixed(),
          fee: +(this.fee * 100).toFixed(),
          method: +this.method.value,
          note: '',
          openid: ''
      };
      switch (+this.method.value) {
          case 1:
              data.note = '提现-支付宝(手动)-' + this.user['alipay'];
              break;
          case 2:
              data.note = '提现-微信(手动)-' + this.user['wechat'];
              break;
          case 3:
              data.note = '提现-微信';
              data.openid = 'oPKyH6F6b7I1n9gmdIJ6wjgBPlkc';
              /*
              const scope = 'snsapi_userinfo';
              const state = '_' + (+new Date());
              this.Wechat.auth(scope, state).then((res) => {
                  this.authCode = res;
                  console.log('========Begin===========');
                  console.log('code is:', this.authCode.code);
                  console.log('errCode is:', this.authCode.ErrCode);
                  console.log('state is:', this.authCode.state);
                  console.log('lang is:', this.authCode.lang);
                  console.log('conntry is:', this.authCode.country);
                  console.log('========End===========');
                  const postData = {
                      code: this.authCode.code,
                      uid: this.user.id
                  };
                  this.httpService.post('wxauth', postData).subscribe((res1) => {
                      console.log('wxuserinfo: ', res1);
                      this.wxuserinfo = res1;
                      console.log('========Begin===========');
                      console.log('img is:', this.wxuserinfo.headimgurl);
                      console.log('nick is:', this.wxuserinfo.nickname);
                      console.log('openid is:', this.wxuserinfo.openid);
                      console.log('unionid is:', this.wxuserinfo.unionid);
                      console.log('========End===========');
                      data.openid = this.wxuserinfo.openid;
                  });
              }, reason => {
                  console.log('failed: ', reason);
              });
              */
              break;
      }
      this.httpService.post('order', data).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('提现处理中，请稍候');
          this.navCtrl.back();
      });
  }

  changeMethod(e){
      // console.log(this.method.value);
      this.form.updateValueAndValidity();
      console.log(this.form);
  }

  changeType(e){
      switch (+this.type.value) {
          case 1:
              this.balance = this.topup;
              break;
          case 2:
              this.balance = this.earnings;
              break;
      }
      this.amount.setValidators([Validators.required, Validators.min(this.min), Validators.max(this.balance)]);
      this.amount.updateValueAndValidity();
      this.getActual();
  }

  editAccount(i) {
      console.log(i);
      switch (i) {
          case 1:
              this.alipay.enable();
              break;
          case 2:
              this.wechat.enable();
              break;
      }
  }

  async confirmAccount(i){
      let m;
      switch (i) {
          case this.alipay:
              m = 'alipay';
              break;
          case this.wechat:
              m = 'wechat';
              break;
      }
      const alert = await this.alertController.create({
          header: '请确认账号无误',
          message: `您输入的账号为 ${i.value}`,
          buttons: [
              {
                  text: '取消',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                      console.log('Confirm Cancel: blah');
                      i.setValue(this.user[m]);
                      if (i.value) {
                          i.disable();
                      }
                  }
              }, {
                  text: '确定',
                  handler: () => {
                      console.log('Confirm Okay');
                      this.user[m] = i.value;
                      const data = {
                          [m]: i.value
                      };
                      this.httpService.patch('users/' + this.userData.id, data).subscribe((res) => {
                      });
                      i.disable();
                  }
              }
          ]
      });

      await alert.present();
  }

  getActual(){
      this.actual = +this.amount.value;
      this.fee = +(this.actual * this.feeRate).toFixed(2);
      if ((this.fee + this.actual) > this.balance) {
          this.actual = +(this.balance / (1 + this.feeRate)).toFixed(2);
          this.fee = +(this.actual * this.feeRate).toFixed(2);
      }
      this.sum = +(this.fee + this.actual).toFixed(2);
  }
}
