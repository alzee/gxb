import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-chphone',
  templateUrl: './chphone.page.html',
  styleUrls: ['./chphone.page.scss'],
})
export class ChphonePage implements OnInit {
  userData: Data;
  resp: Data;
  form: FormGroup;
  codeSent = false;
  phoneDup = 0;
  resendTime = 59;
  codeTimeout = 300;
  smsType = 'verify';
  smsPass = environment.smsPass;
  smsResp;
  getCodeBtnText = '获取验证码';

  constructor(
      public navCtrl: NavController,
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private toastService: ToastService,
      private storageService: StorageService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          }
      );

      this.form = this.formBuilder.group({
          pass: [''],
          phone: [''],
          otp: ['']
      });
  }

  get pass(){
      return this.form.get('pass');
  }

  get phone(){
      return this.form.get('phone');
  }

  get otp(){
      return this.form.get('otp');
  }

  checkPhoneDup(){
      this.phoneDup = 0;
      if (this.phone.valid) {
          this.httpService.get('users?page=1&itemsPerPage=1&phone=' + this.phone.value).subscribe((res) => {
              if (res.length > 0) {
                  this.phoneDup = 1;
              }
              else {
                  this.phoneDup = 2;
              }
          });
      }
  }

  getSms(){
      this.httpService.get(`getsms?phone=${this.phone.value}&type=${this.smsType}&pass=${this.smsPass}`).subscribe((res) => {
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

  chkcode() {
      if (!this.smsResp){
          return 1;
      }
      else if (this.smsResp.code === 'timeout'){
          return 2;
      }
      else if (this.otp.value !== this.smsResp.code){
          return 3;
      }
  }

  chphone(){
      const postData = {
          uid: this.userData.id,
          pass: this.pass.value,
          phone: this.phone.value,
          otp: this.otp.value
      };
      this.httpService.post('chphone', postData).subscribe((res) => {
          this.resp = res;
          console.log(res);
          switch (this.resp.code) {
              case 0:
                  this.toastService.presentToast('手机号已修改');
                  this.navCtrl.back();
                  break;
              default:
                  this.toastService.presentToast(this.resp.msg);
          }
      });
  }
}
