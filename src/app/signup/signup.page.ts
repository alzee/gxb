import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    passType: string;
    form: FormGroup;
    getCodeBtnText: string;
    codeSent: boolean;
    phoneDup = 0;
    usernameDup = 0;
    resendTime = 59;
    codeTimeout = 300;
    smsType = 'register';
    smsPass: string;
    smsResp;
    refcodeFound = true;
    referrer: Data;
    resp: Data;
    term = {
        isChecked: true
    };

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private toastService: ToastService,
        private storageService: StorageService,
        private httpService: HttpService,
        private router: Router
    ) {
        this.smsPass = environment.smsPass;
        this.getCodeBtnText = '获取验证码';
        this.codeSent = false;
        this.passType = 'password';
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue],
            username: [''],
            password: [''],
            // phone: ['', this.phoneDupValidator()],
            phone: [''],
            otp: [''],
            refcode: ['']
        });
    }

    /*
    phoneDupValidator(): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(!control.errors){
                console.log(control.errors);
            }
            const isUsed = false;
            return isUsed ? { invalidPhone: true } : null;
        };
    }
    */

    get username(){
      return this.form.get('username');
    }

    get password(){
      return this.form.get('password');
    }

    get phone(){
      return this.form.get('phone');
    }

    get otp(){
      return this.form.get('otp');
    }

    get refcode(){
      return this.form.get('refcode');
    }

    signup() {
        const postData = {
            username: this.username.value,
            plainPassword: this.password.value,
            phone: this.phone.value,
            otp: this.otp.value,
            referrerId: ''
        };
        if (this.referrer) {
            postData.referrerId = this.referrer.id;
        }
        else {
            delete postData.referrerId;
        }
        this.authService.signup(postData).subscribe(
            (res: any) => {
                console.log(res);
                this.resp = res;
                switch (this.resp.code) {
                    case 0:
                        this.toastService.presentToast(this.resp.msg);
                        this.router.navigate(['/signin']);
                        break;
                    default:
                        this.toastService.presentToast(this.resp.msg);
                }
            },
            (error: any) => {
                this.toastService.presentToast('网络异常');
            }
        );
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

    checkUsernameDup(){
        this.usernameDup = 0;
        if (this.username.valid) {
            this.httpService.get('users?page=1&itemsPerPage=1&username=' + this.username.value).subscribe((res) => {
                if (res.length > 0) {
                    this.usernameDup = 1;
                }
                else {
                    this.usernameDup = 2;
                }
            });
        }
    }

    checkRefcode(){
        if (this.refcode.valid) {
            if (this.refcode.value.length === 0) {
                this.refcodeFound = true;
            }
            else{
                this.httpService.get('users?refcode=' + this.refcode.value).subscribe((res) => {
                    console.log(res);
                    if (res.length > 0) {
                        this.referrer = res[0];
                        this.refcodeFound = true;
                    }
                    else {
                        this.refcodeFound = false;
                    }
                });
            }
        }
    }

    getSms(){
      console.log(this.smsType);
      console.log(this.smsPass);
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

    togglePassType(){
        if (this.passType === 'text'){
            this.passType = 'password';
        }
        else{
            this.passType = 'text';
        }
    }
}
