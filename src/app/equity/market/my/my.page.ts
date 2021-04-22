import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthConstants } from '../../../config/auth-constants';
import { StorageService } from '../../../services/storage.service';

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
  max: number;
  min: number;
  count: number;
  price: number;
  configs: Array<Data>;
  userData: Data;
  user: Data;
  myEquity: number;

  constructor(
      private storageService: StorageService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) {
      this.max = 0;
      this.min = 0;
      this.count = 0;
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
              this.httpService.get('users/' + this.userData.id).subscribe((res) => {
                  this.user = res;
                  this.myEquity = this.user.equity;
              });
          });
      this.httpService.get('configs?itemsPerPage=30').subscribe((res) => {
          this.configs = res;
          for (const i of this.configs) {
              if (i.label === 'equityPrice') {
                  this.price = i.value;
              }
          }
          console.log(res);
      });

      this.httpService.get('equity_trades?page=1&itemsPerPage=10').subscribe((res) => {
          this.hists = res;
          console.log(res);
      });
  }
}
