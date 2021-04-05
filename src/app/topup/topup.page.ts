import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { Platform } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';
// declare var Wechat:any;

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {
  min: number;
  form: FormGroup;

  constructor(
      private wechat: Wechat,
      private platform: Platform,
      private toastService: ToastService,
      private formBuilder: FormBuilder,
      private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
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
    // console.log(this.amount);
    this.platform.ready().then(() => {
        // this.wechat.isInstalled(function (installed) {
        //     this.toastService.presentToast("Wechat installed: " + (installed ? "Yes" : "No"));
        // }, function (reason) {
        //     this.toastService.presentToast("Failed: " + reason);
        // });

        // alert("Wechat installed: " + (this.wechat.isInstalled() ? "Yes" : "No"));
        //this.wechat.isInstalled(function (installed) {
        //    alert("Wechat installed: " + (installed ? "Yes" : "No"));
        //}, function (reason) {
        //    alert("Failed: " + reason);
        //});

        let params = {
            partnerid: '10000100', // merchant id
            prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
            noncestr: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
            timestamp: '1439531364', // timestamp
            sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
        };

        /*
        this.wechat.isInstalled().then((res) => {
            alert('fuck yeah');
        }, reason => {
            alert('fuck no:' + reason);
        });
       */

        this.wechat.sendPaymentRequest(params)
        .then((resp) => {
            console.log('fuck');
        }, reason => {
            console.log('fuck no:' + reason );
        });
    });
  }
}
