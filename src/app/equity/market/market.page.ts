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

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.httpService.get('equity_shops?page=1&itemsPerPage=30').subscribe((res) => {
          this.shops = res;
          console.log(res);
      });
  }

}
