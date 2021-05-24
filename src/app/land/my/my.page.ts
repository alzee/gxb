import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
  envs = environment;
  total: number;
  cellProfit: number;
  landProfit: number;
  myLands = [];
  sold = [];
  uid: number;
  user: Data;
  seg = 'my';
  showSold = false;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.uid = res.id;
      console.log(this.uid);
      this.httpService.get('users/' + this.uid).subscribe((res1) => {
          this.user = res1;
          this.cellProfit = this.user.cellProfit;
          this.landProfit = this.user.landProfit;
          this.total = this.cellProfit + this.landProfit;
      });
    });
  }

  ionViewWillEnter(){
    this.httpService.get('lands?page=1&itemsPerPage=30&order%5BupdatedAt%5D=desc&owner.id=' + this.uid).subscribe((res1) => {
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
