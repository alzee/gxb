import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';

interface Data {
    [propName: string]: any;
}

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
  equity: number;
  userData: Data;
  user: Data;
  configs: Array<Data>;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) {
      this.remain = 0;
      this.taken = 0;
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
              this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
                  this.user = res1;
                  this.equity = this.user.equity;
              });
          });
      this.httpService.get('configs?itemsPerPage=30').subscribe((res) => {
          this.configs = res;
          // this.total = this.configs.quantityGXB.value;
          // this.rate = this.configs.exchangePirce.value;
          for (const i of this.configs) {
              if (i.label === 'equity') {
                  this.total = i.value;
              }
              if (i.label === 'EquityGXBRate') {
                  this.rate = 1 / i.value;
              }
          }
      });
  }

}
