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
  topup: number;
  earnings: number;
  amount: number;
  type: number;
  userData = {
      id: 0
  };
  user: Data;

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
        console.log(0);
        break;
    }
  }
}
