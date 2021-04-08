import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Platform, LoadingController, NavController } from '@ionic/angular';
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
  min = 5;
  form: FormGroup;
  data: Data;
  userData: Data;


  constructor(
      public navCtrl: NavController,
      public loadingController: LoadingController,
      private router: Router,
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
          amount: [, Validators.min(this.min)]
      });

      this.activeRoute.queryParams.subscribe((params: Params) => {
          if (params.amount){
              this.min = params.amount;
              this.amount.setValue(this.min);
              this.amount.setValidators(Validators.min(this.min));
          }
          console.log(this.min);
      });
  }

  get amount(){
      return this.form.controls.amount;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      // cssClass: 'my-custom-class',
      message: '正在支付...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  topup(){
      const data = {
          uid: this.userData.id,
          amount: this.amount.value,
          type: 1,
          note: '充值'
      };
      this.httpService.post('prepayid', data).subscribe((res) => {
          console.log(res);
          const params = res;
          // this.router.navigate(['/tabs/me'], {replaceUrl: true});
          // this.navCtrl.navigateRoot(['/tabs/me']);
          // this.navCtrl.navigateRoot('/tabs/me');
          // this.navCtrl.navigateBack('/tabs/me');
          // this.navCtrl.navigateForward('/tabs/me');
          // this.navCtrl.back();

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

                  // this.location.back();
                  this.presentLoading().then(
                      (res2) => {
                          this.toastService.presentToast('充值成功！');
                          // this.router.navigate(['/tabs/me'], {replaceUrl: true});
                          this.navCtrl.back();
                      }, reason => {
                      }
                  );
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
