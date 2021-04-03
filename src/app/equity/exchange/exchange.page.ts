import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {
  rate: number;
  total: number;
  remain: number;
  taken: number;

  constructor(
      private httpService: HttpService
  ) {
      this.remain = 0;
      this.taken = 0;
  }

  ngOnInit() {
      this.httpService.get('configs?page=1&label=exchangePirce').subscribe((res) => {
          this.rate = 1 / res[0].value;
          console.log(this.rate);
      });

      this.httpService.get('configs?page=1&label=quantityGXB').subscribe((res) => {
          this.total = res[0].value;
          console.log(this.total);
      });
  }

}
