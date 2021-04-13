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
    remaining: number;
    smsType = 'register';
    smsPass: string;
    smsResp;
    refcodeFound = true;
    referrer: Data;
    term = {
        isChecked: true
    };
    postData = {
        username: '',
        password: '',
        phone: '',
        referrer: ''
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
        this.remaining = 59;
        this.passType = 'password';
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue],
            username: [''],
            password: [''],
            // phone: ['', this.phoneDupValidator()],
            phone: [''],
            vCode: [''],
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

    get vCode(){
      return this.form.get('vCode');
    }

    get refcode(){
      return this.form.get('refcode');
    }

    validateInputs() {
        if (!this.smsResp){
            return 1;
        }
        else if (this.smsResp.code === 'timeout'){
            return 2;
        }
        else if (this.vCode.value !== this.smsResp.code){
            return 3;
        }
    }

    signup() {
        console.log(this.smsResp);
        switch (this.validateInputs()){
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
                this.postData.username = this.username.value;
                this.postData.password = this.password.value;
                this.postData.phone = this.phone.value;
                if (this.referrer) {
                    this.postData.referrer = '/api/users/' + this.referrer.id;
                }
                this.authService.signup(this.postData).subscribe(
                    (res: any) => {
                        console.log(res);
                        if (res) {
                            this.toastService.presentToast('注册成功');
                            this.router.navigate(['/signin']);
                        } else {
                            this.toastService.presentToast(
                                '用户名已存在'
                            );
                        }
                    },
                    (error: any) => {
                        this.toastService.presentToast('网络异常');
                    }
            );
        }
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
      this.httpService.get(`sms?phone=${this.phone.value}&type=${this.smsType}&pass=${this.smsPass}`).subscribe((res) => {
          this.toastService.presentToast('验证码已发送');
          this.getCodeBtnText = `重新发送(${this.remaining})`;
          const that = this;
          const interval = setInterval(() => {
              that.remaining -= 1;
              that.getCodeBtnText = `重新发送(${that.remaining})`;
              if (that.remaining === 0){
                  clearInterval(interval);
                  that.getCodeBtnText = '获取验证码';
                  that.codeSent = false;
                  that.remaining = 59;
                  that.smsResp.code = 'timeout';
              }
          }, 1000);
          this.codeSent = true;
          this.smsResp = res;
          console.log(res);
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
