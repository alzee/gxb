import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import {Location} from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Platform } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  amount: number;
  prevUrl: string;
  subscription: Subscription;
  message: Data;
  url: string;
  postData: Data;
  userData: Data;
  availableBalance: number;
  payMethod = 0;

  constructor(
      private wechat: Wechat,
      private platform: Platform,
      private storageService: StorageService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private router: Router,
      private location: Location,
      private data: DataService
  ) { }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      this.amount = this.message.price;
      this.url = this.message.url;
      this.postData = this.message.data;
      console.log(this.message);

      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              this.availableBalance = this.user.topup + this.user.earnings;
              if (this.availableBalance < this.amount) {
                  this.payMethod = 1;
              }
          });
      });

      // use service instead of query params
      // this.activeRoute.queryParams.subscribe((params: Params) => {
      //     this.amount = params.amount;
      // });

      // this.router.events.pipe(filter((e: any) => e instanceof RoutesRecognized),
      //                         pairwise()
      //                        ).subscribe((e: any) => {
      //                          this.prevUrl = e[0].urlAfterRedirects; // previous url
      //                          console.log(this.prevUrl);
      //                        });
  }

  pay() {
    if (this.payMethod === 0) {
        // balance
        this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
            console.log(res1);
            this.user = res1;
            this.availableBalance = this.user.topup + this.user.earnings;
        });
        this.location.back();
        // this.router.navigate(['land/occupy'], {queryParams: {paid: 'n'}});
    }
    else {
        // wechat
        const data = {
            uid: this.userData.id,
            amount: this.amount,
            type: 3,
            note: '支付'
        };
        this.httpService.post('prepayid', data).subscribe((res) => {
            console.log(res);
            const params = res;

            this.platform.ready().then(() => {
                this.wechat.sendPaymentRequest(params).then((res1) => {
                    console.log(params);
                    this.location.back();
                }, reason => {
                    console.log('failed : ', reason);
                });
            });
        });
    }
  }

  changePayMethod(e){
      this.payMethod = parseInt(e.detail.value, 10);
      console.log(this.payMethod);
  }
}
