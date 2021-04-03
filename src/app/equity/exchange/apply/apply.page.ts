import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../../config/auth-constants';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {
  uid: number;
  gxb: number;
  rate: number;
  equity: number = 0;
  equityBefore: number;
  max: number;
  userData: Data;

  constructor(
      private httpService: HttpService,
      private storageService: StorageService,
      private toastService: ToastService,
      public alertController: AlertController,
      private router: Router,
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
      this.uid = this.userData.id;
      this.httpService.get('users/' + this.uid).subscribe((res1) => {
          this.userData = res1;
          this.gxb = this.userData.gxb;
          this.equityBefore = this.userData.equity;
          console.log(this.gxb);
      });
    });

    this.httpService.get('configs?page=1&label=exchangePirce').subscribe((res) => {
        this.rate = 1 / res[0].value;
        console.log(this.rate);
    });
  }

  buyMax(){
      this.max = this.gxb / this.rate;
      this.equity = Math.trunc(this.max);
  }

  validate(){
    if (this.equity === 0) {
      return 1;
    }
    if (this.equity * this.rate > this.gxb) {
      return 2;
    }
  }

  apply0(){
    // subtract gxb
    const gxbAfter = this.gxb - this.equity * this.rate;
    // add equity
    const equityAfter = this.equityBefore + this.equity;
    // subtract platform equity
    console.log(gxbAfter, equityAfter);
    if (this.validate() === 1) {
      this.toastService.presentToast('请输入购买的股权数量');
    }
    else{
      const data = {
        gxb: gxbAfter,
        equity: equityAfter
      };
      this.httpService.patch('users/' + this.uid, data).subscribe((res) => {
        console.log(res);
      });
    }
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
            const gxbAfter = this.gxb - this.equity * this.rate;
            // add equity
            const equityAfter = this.equityBefore + this.equity;
            // subtract platform equity
            console.log(gxbAfter, equityAfter);
            if (this.validate() === 1) {
              this.toastService.presentToast('请输入购买的股权数量');
            }else if (this.validate() === 2) {
              this.toastService.presentToast('GXB 不够');
            }
            else{
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
        }
      ]
    });
    await alert.present();
  }
}
