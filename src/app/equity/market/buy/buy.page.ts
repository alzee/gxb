import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  hists = [];
  max: number = 0;
  min: number = 0;
  count: number = 0;
  price: number;
  shopId: number;
  shop: Data;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.shopId = params['id'];
          this.httpService.get('equity_shops?page=1&id=' + this.shopId).subscribe((res) => {
              this.shop = res[0];
              this.price = this.shop.price;
              console.log(this.shop);
          });
      });

      this.httpService.get('equity_trades?page=1&itemsPerPage=30').subscribe((res) => {
          this.hists = res;
          console.log(res);
      });
  }

}
