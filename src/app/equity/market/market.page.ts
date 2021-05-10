import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  message: Data;
  trades: Array<Data>;
  userData: Data;
  orderType = 5;
  orderNote = '购买股权';
  query = 'page=1&itemsPerPage=30&order%5Bdate%5D=desc&status=0';
  uid: number;

  constructor(
      private httpService: HttpService,
      private router: Router,
      private storageService: StorageService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
              this.uid = this.userData.id;
          });
      this.httpService.get(`equity_trades?${this.query}`).subscribe((res) => {
          this.trades = res;
          console.log(res);
      });
  }

  buy(i: Data){
    const orderData = {
      type: this.orderType,
      note: this.orderNote,
      amount: i.rmb / 100,
      data: {
        entityId: i.id,
        // postData
      }
    };
    this.message = {
      orderData
    };
    this.data.changeMessage(this.message);
    this.router.navigate(['/pay'], { replaceUrl: true });
  }
}
