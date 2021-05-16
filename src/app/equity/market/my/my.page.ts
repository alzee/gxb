import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { AuthConstants } from '../../../config/auth-constants';
import { StorageService } from '../../../services/storage.service';
import { DataService } from '../../../services/data.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
  hists = [];
  total: number;
  price: number;
  priceMax: number;
  priceMin: number;
  conf: Data;
  userData: Data;
  user: Data;
  myEquity: number;
  query = 'page=1&itemsPerPage=10&order%5Bdate%5D=desc';

  constructor(
      private router: Router,
      private storageService: StorageService,
      private httpService: HttpService,
      private data: DataService
  ) {
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          });
  }

  ionViewWillEnter(){
      this.httpService.get('users/' + this.userData.id).subscribe((res) => {
          this.user = res;
          this.myEquity = this.user.equity;
      });
      this.httpService.get('confs/1').subscribe((res) => {
          this.conf = res;
          this.price = this.conf.equityPrice;
          this.priceMax = this.conf.equityPriceMax;
          this.priceMin = this.conf.equityPriceMin;
          console.log(res);
      });
      this.httpService.get(`equity_trades?${this.query}&seller=${this.userData.id}`).subscribe((res) => {
          this.hists = res;
          console.log(res);
      });
      this.httpService.get('equity_trades/total').subscribe((res) => {
          console.log(res);
          this.total = +res;
      });
  }

  sell(){
      this.data.changeMessage({equity: this.myEquity, price: this.price, user: '/api/users/' + this.userData.id});
      this.router.navigate(['/equity/market/sell']);
  }

  buy(){
      this.router.navigate(['/equity/market']);
  }
}
