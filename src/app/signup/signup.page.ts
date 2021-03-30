import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    form: FormGroup;
    getCodeBtnText: string;
    codeSent: boolean;
    remaining: number;
    smsType: string = 'register';
    smsPass: string;
    smsResp;
    term = {
        isChecked: true
    }
    postData = {
        username: '',
        password: '',
        phone: ''
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
        this.getCodeBtnText = "获取验证码";
        this.codeSent = false;
        this.remaining = 59;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue],
            username: [''],
            password: [''],
            phone: [''],
            vCode: ['']
        });
    }

    validateInputs() {
        if(!this.smsResp){
            return 1
        }
        else if(this.smsResp.code == 'timeout'){
            return 2
        }
        else if(this.form.value.vCode != this.smsResp.code){
            return 3
        }
    }

    signup() {
        console.log(this.smsResp);
        switch(this.validateInputs()){
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
                this.postData.username = this.form.value.username;
                this.postData.password = this.form.value.password;
                this.postData.phone = this.form.value.phone;
                this.authService.signup(this.postData).subscribe(
                    (res: any) => {
                        console.log(res);
                        if (res) {
                            // Storing the User data.
                            //this.storageService.store(AuthConstants.AUTH, res.data)
                            //.then(res => {
                            //    this.router.navigate(['/tabs/home']);
                            //});
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

    getSms(){
      console.log(this.smsType);
      console.log(this.smsPass);
      console.log(this.form);
      //if(){
      //    this.toastService.presentToast('请获取验证码');
      //}
      this.httpService.get(`sms?phone=${this.phone}&type=${this.smsType}&pass=${this.smsPass}`).subscribe((res) => {
          this.toastService.presentToast('验证码已发送');
          this.getCodeBtnText = `重新发送(${this.remaining})`;
          let that = this;
          let interval = setInterval(function(){
              that.remaining -= 1;
              that.getCodeBtnText = `重新发送(${that.remaining})`;
              if (that.remaining == 0){
                  clearInterval(interval);
                  that.getCodeBtnText = '获取验证码';
                  that.codeSent = false;
                  that.remaining = 59;
                  that.smsResp.code = 'timeout';
              }
          }, 1000);
          this.codeSent = true;
          this.smsResp= res;
          console.log(res);
      });
    }
}
