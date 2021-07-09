import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

interface Data {
    [propName: string]: any;
}

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
  codeTimeout = 300;
  smsType = 'verify';
  smsPass = environment.smsPass;
  smsResp;
  getCodeBtnText = '获取验证码';
  phone: string;
  otp: string;
  uid: number;
  action: string;

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.phone = this.message.phone;
    this.action = this.message.action;
  }

  getOtp(){
      this.httpService.get(`getsms?phone=${this.phone}&type=${this.smsType}&pass=${this.smsPass}`).subscribe((res) => {
          this.smsResp = res;
          if (this.smsResp.success) {
              this.toastService.presentToast('验证码已发送');
          }
          else {
              this.toastService.presentToast('验证码发送失败，请稍后重试');
          }
          console.log(res);
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
                  that.codeTimeout = 300;
              }
          }, 1000);
          this.codeSent = true;
      });
  }

  chpass(){
      const postData = {
          phone: this.phone,
          otp: this.otp
      };
      this.httpService.post('verifyotp', postData).subscribe((res) => {
          this.resp = res;
          console.log(res);
          switch (this.resp.code) {
              case 1:
                  this.toastService.presentToast('验证码超时，请重新获取');
                  break;
              case 2:
                  this.toastService.presentToast('验证码错误');
                  break;
              default:
                  if (this.action === 'reset') {
                      this.router.navigate(['/chpasswd'], {replaceUrl: true});
                  }
                  if (this.action === 'resetpay') {
                      const msg = {
                          action: 'resetpay_otp'
                      };
                      this.data.changeMessage(msg);
                      this.router.navigate(['/chpaypass'], {replaceUrl: true});
                  }
          }
      });
  }
}
