import { Component, OnInit } from '@angular/core';
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
    smsType: string = 'register';
    smsPass: string;
    smsResp;
    username: string;
    password: string;
    phone: string;
    vCode: string;
    term = {
        isChecked: true
    }
    postData = {
        username: '',
        password: '',
        phone: ''
    };

    constructor(
        private authService: AuthService,
        private toastService: ToastService,
        private storageService: StorageService,
        private httpService: HttpService,
        private router: Router
    ) {
        this.smsPass = environment.smsPass;
    }

    ngOnInit() {}

    validateInputs() {
        if(!this.smsResp){
            return 1
        }
        else if(this.vCode != this.smsResp.code){
            return 2
        }
    }

    signup() {
        console.log(this.smsResp);
        switch(this.validateInputs()){
            case 1:
                this.toastService.presentToast('请获取验证码');
                break;
            case 2:
                this.toastService.presentToast('验证码错误');
                break;
            default:
                this.postData.username = this.username;
                this.postData.password = this.password;
                this.postData.phone = this.phone;
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
      console.log(this.phone);
      console.log(this.smsType);
      console.log(this.smsPass);
      //if(){
      //    this.toastService.presentToast('请获取验证码');
      //}
      this.httpService.get(`sms?phone=${this.phone}&type=${this.smsType}&pass=${this.smsPass}`).subscribe((res) => {
          this.toastService.presentToast('验证码已发送');
          this.smsResp= res;
          console.log(res);
      });
    }
}
