import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

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
  isReset = false;
  message: Data;
  uid: number;

  constructor(
      public navCtrl: NavController,
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private toastService: ToastService,
      private storageService: StorageService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      if (this.message.action === 'reset') {
          this.isReset = true;
      }
      else {
          this.storageService.get(AuthConstants.AUTH).then(
              (res) => {
                  this.userData = res;
              });
      }


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
      if (this.isReset) {
          this.uid = this.message.uid;
          this.ch();
      }
      else {
          this.uid = this.userData.id;
          const postData = {
              uid: this.uid,
              pass: this.oldPass.value,
              type: 0
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
  }

  ch(){
      const postData = {
          password: this.newPass.value
      };
      this.httpService.patch('users/' + this.uid, postData).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('密码已修改');
          this.navCtrl.back();
      });
  }
}
