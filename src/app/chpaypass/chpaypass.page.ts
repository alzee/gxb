import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-chpaypass',
  templateUrl: './chpaypass.page.html',
  styleUrls: ['./chpaypass.page.scss'],
})
export class ChpaypassPage implements OnInit {
  userData: Data;
  resp: Data;
  form: FormGroup;
  isset: boolean;

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
              this.httpService.get('paypassnull/' + this.userData.id ).subscribe((res1) => {
                  this.resp = res1;
                  if (this.resp.code === 0) {
                      this.isset = false;
                  }
                  else {
                      this.isset = true;
                  }
              });
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
      if (this.isset) {
          const postData = {
              uid: this.userData.id,
              pass: this.oldPass.value,
              type: 1
          };
          this.httpService.post('chkpass', postData).subscribe((res) => {
              this.resp = res;
              if (this.resp.code === 0) {
                  this.ch();
              }
              else {
                  this.toastService.presentToast('原密码输入错误');
              }
          });
      }
      else {
          this.ch();
      }
  }

  ch() {
      const postData = {
          payPasswd: this.newPass.value
      };
      this.httpService.patch('users/' + this.userData.id, postData).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('密码已修改');
          this.navCtrl.back();
      });
  }

}
