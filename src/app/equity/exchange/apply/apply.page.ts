import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../../config/auth-constants';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {
  form: FormGroup;
  uid: number;
  gxb: number;
  rate: number;
  equityBefore: number;
  max: number;
  total: number;
  userData: Data;

  constructor(
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private storageService: StorageService,
      private toastService: ToastService,
      public alertController: AlertController,
      private router: Router,
  ) {
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
      this.uid = this.userData.id;
      this.httpService.get('users/' + this.uid).subscribe((res1) => {
          this.userData = res1;
          this.gxb = this.userData.gxb;
          this.equityBefore = this.userData.equity;
          console.log(this.gxb);
          this.httpService.get('configs?page=1&label=EquityGXBRate').subscribe((res2) => {
              this.rate = 1 / res2[0].value;
              this.max = this.gxb / this.rate;
              this.equity.setValidators([Validators.min(1), Validators.max(this.max), Validators.pattern('^[0-9]*$')]);
              console.log(this.rate);
          });
      });
    });


    this.form = this.formBuilder.group({
        equity: []
    });
  }

  get equity(){
      return this.form.controls.equity;
  }

  buyMax(){
      this.equity.setValue(Math.trunc(this.max));
  }

  check(){
      this.total = this.equity.value * this.rate;
  }

  async apply() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'GXB 兑换股权！',
      message: '此交易无法撤销！确定要兑换么？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          cssClass: 'danger',
          handler: () => {
            // subtract gxb
            const gxbAfter = this.gxb - this.equity.value * this.rate;
            // add equity
            const equityAfter = this.equityBefore + this.equity.value;
            // subtract platform equity
            const data = {
                gxb: gxbAfter,
                equity: equityAfter
            };
            this.httpService.patch('users/' + this.uid, data).subscribe((res) => {
                console.log(res);
                this.toastService.presentToast('兑换成功！');
                this.router.navigate(['/equity/exchange']);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
