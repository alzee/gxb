import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  userData: Data;
  message: Data;
  resp: Data;
  codeSent = false;
  resendTime = 59;
  codeTimeout = 120;
  smsType = 'verify';
  smsPass = environment.smsPass;
  smsResp;
  getCodeBtnText = '获取验证码';
  phone: string;
  vCode: string;
  uid: number;

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.phone = this.message.phone;
  }

  getSms(){
      this.httpService.get(`sms?phone=${this.phone}&type=${this.smsType}&pass=${this.smsPass}`).subscribe((res) => {
          this.toastService.presentToast('验证码已发送');
          this.getCodeBtnText = `重新发送(${this.resendTime})`;
          const that = this;
          const interval = setInterval(() => {
              that.resendTime -= 1;
              that.getCodeBtnText = `重新发送(${that.resendTime})`;
              if (that.resendTime === 0){
                  clearInterval(interval);
                  that.getCodeBtnText = '获取验证码';
                  that.codeSent = false;
                  that.resendTime = 59;
              }
          }, 1000);
          const interval2 = setInterval(() => {
              that.codeTimeout -= 1;
              if (that.codeTimeout === 0){
                  clearInterval(interval2);
                  that.codeTimeout = 120;
                  that.smsResp.code = 'timeout';
              }
          }, 1000);
          this.codeSent = true;
          this.smsResp = res;
          console.log(res);
      });
  }

  chkcode() {
      if (!this.smsResp){
          return 1;
      }
      else if (this.smsResp.code === 'timeout'){
          return 2;
      }
      else if (this.vCode !== this.smsResp.code){
          return 3;
      }
  }

  chpass(){
      switch (this.chkcode()) {
          case 1:
              this.toastService.presentToast('请获取验证码');
          break;
          case 2:
              this.toastService.presentToast('验证码超时，请重新获取');
          break;
          case 3:
              this.toastService.presentToast('验证码错误');
          break;
          default:
              this.router.navigate(['/chpasswd']);
      }
  }
}
