import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { AlertController, Platform, LoadingController, NavController } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';
import { ToastService } from '../services/toast.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  prevUrl: string;
  subscription: Subscription;
  message: Data;
  resp: Data;
  url: string;
  httpMethod: string;
  postData: Data;
  orderData: Data;
  userData: Data;
  user: Data;
  availableBalance: number;
  insufficient: boolean;
  payMethod = 0;
  coupon: Data;
  clicked = false;

  constructor(
      public alertController: AlertController,
      public modalController: ModalController,
      public navCtrl: NavController,
      public loadingController: LoadingController,
      private wechat: Wechat,
      private platform: Platform,
      private storageService: StorageService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private router: Router,
      private toastService: ToastService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      this.url = this.message.url;
      this.httpMethod = this.message.httpMethod;
      this.postData = this.message.postData;
      if (this.postData && this.postData.price) {
        this.postData.price = Math.round(this.postData.price * 100);
      }
      this.orderData = this.message.orderData;
      this.orderData.amount = Math.round(this.orderData.amount * 100);
      console.log(this.message);

      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              if (!this.user.active) {
                  this.toastService.presentToast('您的账户已被禁用');
                  this.navCtrl.back();
                  return;
              }
              for (const coupon of this.user.coupon) {
                  if (coupon.type === this.orderData.type) {
                      this.coupon = coupon;
                      this.orderData.amount = this.orderData.amount - coupon.value;
                      this.orderData.couponId = coupon.id;
                      break;
                  }
              }
              if (!this.orderData.couponId) {
                  this.orderData.couponId = 0;
              }
              this.availableBalance = this.user.topup + this.user.earnings;
              if (this.availableBalance < this.orderData.amount) {
                  this.payMethod = 1;
                  this.insufficient = true;
              }
          });
      });
  }

  pay() {
    this.orderData.uid = this.userData.id;
    this.orderData.method = this.payMethod;
    this.httpService.post('order', this.orderData).subscribe((res) => {
        this.clicked = false;
        console.log(res);
        if (this.payMethod === 0) { // balance
            this.toastService.presentToast(this.orderData.note + ' 支付完成');
            this.navCtrl.back();
        }
        else if (this.payMethod === 1) { // wechat
            const params = res;
            this.platform.ready().then(() => {
                this.wechat.sendPaymentRequest(params).then((res1) => {
                    console.log(params);
                    this.presentLoading().then(
                        (res2) => {
                            this.toastService.presentToast(this.orderData.note + ' 支付完成');
                            this.navCtrl.back();
                        }, reason => {
                        }
                    );
                }, reason => {
                    console.log('failed : ', reason);
                });
            });
        }
    });
  }

  changePayMethod(e){
      this.payMethod = parseInt(e.detail.value, 10);
      console.log(this.payMethod);
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

  checkCoupon(e) {
      if (e.detail.checked) {
         this.orderData.amount = this.orderData.amount - this.coupon.value;
         this.orderData.couponId = this.coupon.id;
      }
      else {
         this.orderData.amount = this.orderData.amount + this.coupon.value;
         this.orderData.couponId = 0;
      }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(data => {
        const d = data;
        if (typeof d.data !== 'undefined') {
            if (d.data.passok) {
                this.pay();
            }
        }
    });
    return await modal.present();
  }

  tryMethod() {
      this.clicked = true;
      switch (this.payMethod) {
          case 0:
              this.httpService.get('paypassnull/' + this.userData.id ).subscribe((res) => {
                  this.resp = res;
                  if (this.resp.code === 0) {
                      this.mkpaypass();
                  }
                  else {
                      this.presentModal();
                  }
              });
              break;
          case 1:
              this.pay();
              break;
      }
  }

  async mkpaypass(){
      const alert = await this.alertController.create({
          header: '请先创建支付密码',
          message: '您还未创建支付密码',
          buttons: [{
              text: '确定',
              handler: () => {
                  this.clicked = false;
                  this.router.navigate(['/chpaypass']);
              }
          }],
      });

      await alert.present();
  }
}
