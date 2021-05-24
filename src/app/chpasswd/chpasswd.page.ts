import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-chpasswd',
  templateUrl: './chpasswd.page.html',
  styleUrls: ['./chpasswd.page.scss'],
})
export class ChpasswdPage implements OnInit {
  userData: Data;
  resp: Data;
  form: FormGroup;

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
          oldPass: [''],
          newPass: [''],
          newPass1: ['']
      });
  }

  get oldPass(){
      return this.form.get('oldPass');
  }

  get newPass(){
      return this.form.get('newPass');
  }

  get newPass1(){
      return this.form.get('newPass1');
  }

  chpass() {
      const postData = {
          uid: this.userData.id,
          pass: this.oldPass.value,
          type: 0
      };
      this.httpService.post('chkpass', postData).subscribe((res) => {
          this.resp = res;
          if (this.resp.code === 0) {
              const postData1 = {
                  password: this.newPass.value
              };
              this.httpService.patch('users/' + this.userData.id, postData1).subscribe((res1) => {
                  console.log(res1);
                  this.toastService.presentToast('密码已修改');
                  this.navCtrl.back();
              }
              );
          }
          else {
              this.toastService.presentToast('原密码输入错误');
          }
      }
      );
  }
}
