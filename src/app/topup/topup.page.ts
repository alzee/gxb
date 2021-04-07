import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Platform } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';
import { Location } from '@angular/common';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {
  min: number;
  form: FormGroup;
  data: Data;
  userData: Data;


  constructor(
      private wechat: Wechat,
      private platform: Platform,
      private toastService: ToastService,
      private formBuilder: FormBuilder,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private location: Location,
      private storageService: StorageService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          });

      this.form = this.formBuilder.group({
          amount: []
      });

      this.activeRoute.queryParams.subscribe((params: Params) => {
          if (params.amount){
              this.min = params.amount;
              this.amount.setValue(this.min);
              this.amount.setValidators(Validators.min(this.min));
          }
          else {
              this.min = 0;
          }
          console.log(this.min);
      });
  }

  get amount(){
      return this.form.controls.amount;
  }

  topup(){
      this.httpService.get('prepayid/' + this.amount.value * 100).subscribe((res) => {
          console.log(res);
          const params = res;

          this.platform.ready().then(() => {
              // this.wechat.isInstalled(function (installed) {
              //     this.toastService.presentToast("Wechat installed: " + (installed ? "Yes" : "No"));
              // }, function (reason) {
              //     this.toastService.presentToast("Failed: " + reason);
              // });

              this.wechat.sendPaymentRequest(params).then((res1) => {
                  console.log(params);

                  // verify order

                  // add balance shold put in /api/paid, right?
                  // const data = {
                  // };
                  // this.httpService.path('users/' + this.userData.id, data).subscribe((res) => {
                  //     console.log(res);
                  //     // this.toastService.presentToast('充值成功！');
                  // });

                  this.location.back();
              }, reason => {
                  console.log('failed : ', reason);
              });

              // this.wechat.share({
              //     text: "This is just a plain string",
              //     // scene: this.wechat.Scene.TIMELINE   // share to Timeline
              // }).then((res) => {
              //     console.log('ok');
              // }, reason => {
              //     console.log('no: ', reason);
              // });
          });
      });
  }
}
