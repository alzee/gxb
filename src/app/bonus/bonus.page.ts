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
  fund: number;
  coin: number;
  month: string;
  hists = [];

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
