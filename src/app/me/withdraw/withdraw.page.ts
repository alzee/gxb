import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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

  constructor(
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
  }

  changeMethod(e){
      console.log(this.method.value);
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
      this.amount.setValidators([Validators.required, Validators.min(5), Validators.max(this.balance)]);
      this.amount.updateValueAndValidity();
  }

  edit(i) {
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

  async confirm(i){
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
                      i.disable();
                  }
              }
          ]
      });

      await alert.present();
  }
}
