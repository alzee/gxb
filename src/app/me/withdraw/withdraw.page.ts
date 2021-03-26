import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  topup: number;
  reward: number;
  amount: number;
  type: number;


  constructor(
      private httpService: HttpService,
      private toastService: ToastService
  ) {
    this.topup = 10;
    this.reward = 20;
    //this.type = 1;
  }

  ngOnInit(){
  }

  validate(){
    if(!this.amount)
      return 4;
    if(!this.type)
      return 3;
    if(this.type == 1){
      if(this.amount > this.topup)
        return 1;
    }
    if(this.type == 2){
      if(this.amount > this.reward)
        return 2;
    }
  }

  withdraw(){
    switch(this.validate()){
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
