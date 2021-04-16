import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
  envs = environment;
  income: number;
  profit: number;
  transProfit: number;
  myLands = [];
  sold = [];
  uid: number;
  seg: string;
  showSold: boolean;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) {
      this.income = 0;
      this.profit = 0;
      this.transProfit = 0;
      this.seg = 'my';
      this.showSold = false;
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.uid = res.id;
      console.log(this.uid);
    });
  }

  ionViewWillEnter(){
    this.httpService.get('lands?page=1&itemsPerPage=30&owner.id=' + this.uid).subscribe((res1) => {
      this.myLands = res1;
      console.log(res1);
    });
  }

  segChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    console.log(this.seg);
    if (this.seg === 'my') {
      this.showSold = false;
    }
    else {
      this.showSold = true;
    }
  }
}
