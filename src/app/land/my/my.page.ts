import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

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
  profit: Data;
  seg = 'my';
  showSold = false;

  constructor(
      private router: Router,
      private storageService: StorageService,
      private httpService: HttpService,
      private toastService: ToastService,
      private data: DataService
  ) {
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.uid = res.id;
      this.httpService.get('landprofit/' + this.uid).subscribe((res1) => {
          this.profit = res1;
          console.log(res1);
          this.cellProfit = this.profit.cellProfit;
          this.landProfit = this.profit.landProfit;
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

  changePrice(i){
      const now = new Date();
      const then = new Date(i.updatedAt);
      if ((now.getTime() - then.getTime()) < 3600000) {
          this.toastService.presentToast('每小时只能修改一次价格');
          return;
      }
      const msg = {
          land: i
      };
      this.data.changeMessage(msg);
      this.router.navigate(['/land/changeprice']);
  }
}
