import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

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
  orderType = 5;
  orderNote = '购买股权';

  constructor(
      private httpService: HttpService,
      private router: Router,
      private data: DataService
  ) { }

  ngOnInit() {
      this.httpService.get('equity_trades?page=1&itemsPerPage=30').subscribe((res) => {
          this.shops = res;
          console.log(res);
      });
  }

  buy(i: Data){
    const orderData = {
      type: this.orderType,
      note: this.orderNote,
      amount: i.rmb,
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
