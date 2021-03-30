import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
    passType: string;
    postData = {
        username: '',
        password: ''
    };

    constructor(
        private router: Router,
        private authService: AuthService,
        private storageService: StorageService,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.passType = 'password';
    }

    validateInputs() {
        let username = this.postData.username.trim();
        let password = this.postData.password.trim();
        return (
            this.postData.username &&
                this.postData.password &&
                username.length > 0 &&
                password.length > 0
        );
    }

    login() {
        if (this.validateInputs()) {
            this.authService.login(this.postData).subscribe(
                (res: any) => {
                    if (res) {
                        // Storing the User data.
                        this.storageService.store(AuthConstants.AUTH, res.data);
                        this.router.navigate(['/tabs/home']);
                    } else {
                        this.toastService.presentToast('用户名或密码错误');
                    }
                },
                (error: any) => {
                    //this.toastService.presentToast('网络异常');
                    this.toastService.presentToast('用户名或密码错误');
                }
            );
        } else {
            this.toastService.presentToast('请输入用户名和密码');
        }
    }

    togglePassType(){
        if(this.passType == 'text'){
            this.passType = 'password';
        }
        else{
            this.passType = 'text';
        }
    }
}
