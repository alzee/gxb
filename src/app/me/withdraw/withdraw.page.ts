import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

              if (this.user.alipay) {
                  this.alipay.setValue(this.user.alipay);
                  this.alipay.disable();
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

  confirm(i){
      switch (i) {
          case 1:
              // patch user
              this.alipay.disable();
              break;
          case 2:
              this.wechat.disable();
              break;
      }
  }
}
