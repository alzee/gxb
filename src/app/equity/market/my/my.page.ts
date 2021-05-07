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
  count = 0;
  price: number;
  priceMax: number;
  priceMin: number;
  configs: Array<Data>;
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
      this.httpService.get('configs?itemsPerPage=30').subscribe((res) => {
          this.configs = res;
          for (const i of this.configs) {
              if (i.label === 'equityPrice') {
                  this.price = i.value;
              }
              if (i.label === 'equityPriceMax') {
                  this.priceMax = i.value;
              }
              if (i.label === 'equityPriceMin') {
                  this.priceMin = i.value;
              }
          }
          console.log(res);
      });
      this.httpService.get(`equity_trades?${this.query}&seller=${this.userData.id}`).subscribe((res) => {
          this.hists = res;
          console.log(res);
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
