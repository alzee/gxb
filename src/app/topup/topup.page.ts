import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { HttpService } from '../services/http.service';
import { Platform } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';

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
  partnerid: string;
  prepayid: string;
  noncestr: string;
  timestamp: string;
  sig: string;


  constructor(
      private wechat: Wechat,
      private platform: Platform,
      private toastService: ToastService,
      private formBuilder: FormBuilder,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
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
      this.httpService.get('prepayid').subscribe((res) => {
          console.log(res);
          const params = res;

          //let params = {
          //    partnerid: this.partnerid,
          //    // partnerid: '1606036532',
          //    prepayid: this.prepayid,
          //    noncestr: this.noncestr,
          //    timestamp: this.timestamp,
          //    sign: this.sig
          //};
          console.log(params);
              this.wechat.sendPaymentRequest(params).then((res) => {
                  console.log(params);
              }, reason => {
                  console.log('fucing reason: ', reason);
              });
          this.platform.ready().then(() => {
              // this.wechat.isInstalled(function (installed) {
              //     this.toastService.presentToast("Wechat installed: " + (installed ? "Yes" : "No"));
              // }, function (reason) {
              //     this.toastService.presentToast("Failed: " + reason);
              // });
              
          });
      });
  }
}
