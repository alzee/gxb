import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  topup = 0;
  earnings = 0;
  balance = 0;
  amount: number;
  type: number;
  userData = {
      id: 0
  };
  user: Data;
  method = 1;

  constructor(
      private httpService: HttpService,
      private storageService: StorageService,
      private toastService: ToastService
  ) {
    this.topup = 0;
    this.earnings = 0;
  }

  ngOnInit(){
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              this.topup = this.user.topup;
              this.earnings = this.user.earnings;
          });
      });
  }

  validate(){
    this.amount = this.amount * 100;
    console.log(this.amount);
    if (!this.amount){
      return 4;
    }
    if (!this.type) {
      return 3;
    }
    if (this.type === 1) {
      if (this.amount > this.topup) {
        return 1;
      }
    }
    if (this.type === 2) {
      if (this.amount > this.earnings) {
        return 2;
      }
    }
  }

  withdraw(){
    switch (this.validate()){
      case 1:
        this.toastService.presentToast('提现金额不足');
        console.log('提现金额不足');
        break;
      case 2:
        this.toastService.presentToast('提现金额不足');
        console.log('提现金额不足');
        break;
      case 3:
        this.toastService.presentToast('请选择提现类型');
        console.log('请选择提现类型');
        break;
      case 4:
        this.toastService.presentToast('请输入提现金额');
        console.log('请输入提现金额');
        break;
      default:
        this.toastService.presentToast('提现成功');
        break;
    }
  }

  changeMethod(e){
      this.method = parseInt(e.detail.value, 10);
      console.log(this.method);
  }

  changeType(e){
      this.type = parseInt(e.detail.value, 10);
      console.log(this.type);
      switch (this.type) {
          case 1:
              this.balance = this.topup;
              break;
          case 2:
              this.balance = this.earnings;
              break;
      }
      console.log(this.balance);
  }

}
