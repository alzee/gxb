import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  userData: Data;
  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
        width: '45px',
        height: '45px'
    }
  };

  constructor(
      public modalController: ModalController,
      private httpService: HttpService,
      private toastService: ToastService,
      private storageService: StorageService
  ) { }

  onOtpChange(otp) {
      this.otp = otp;
      console.log(this.otp);
      if (this.otp.length === 6) {
          this.chkpass();
      }
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          }
      );
  }

  chkpass() {
      const postData = {
          uid: this.userData.id,
          pass: this.otp,
          type: 1
      };
      this.httpService.post('chkpass', postData).subscribe((res) => {
          this.resp = res;
          if (this.resp.code === 0) {
              this.modalController.dismiss({
                  passok: true
              });
          }
          else {
              this.toastService.presentToast('密码错误');
          }
      });
  }
}
