import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  shops = [];
  shopId: number;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.shopId = params['id'];
      });

      this.httpService.get('equity_shops?page=1&itemsPerPage=30').subscribe((res) => {
          this.shops = res;
          console.log(res);
      });
  }

}
