import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.page.html',
  styleUrls: ['./bonus.page.scss'],
})
export class BonusPage implements OnInit {
  userData: Data;
  coin: number;
  month: string;
  conf: Data;
  fund: number;
  subtotal: number;
  user: Data;
  page = 1;
  hists: Array<Data>;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    public toastController: ToastController
  ) {
    const d = new Date();
    this.month = d.getFullYear() + '-' + (d.getMonth() + 1);
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
        this.userData = res;
        this.httpService.get(`finances?page=${this.page}&itemsPerPage=10&user=${this.userData.id}&type=59&order%5Bdate%5D=desc`).subscribe((res1) => {
            this.hists = res1;
        });
    });

    this.httpService.get('confs/1').subscribe((res) => {
        this.conf = res;
        this.fund = this.conf.dividendFund;
    });

  }

  ionViewWillEnter(){
      this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
          this.user = res1;
          this.coin = this.user.coin;
      });
  }

  showMonth() {
      console.log(this.month);
  }
}
