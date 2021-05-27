import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';

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
  exchanged: number;
  equity: number;
  userData: Data;
  user: Data;
  node: Data;
  conf: Data;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService,
      private data: DataService
  ) {}

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          });
      this.httpService.get('nodes/9').subscribe((res) => {
          this.node = res;
          const msg = {node: this.node}
          this.data.changeMessage(msg);
      });
  }

  ionViewWillEnter(){
      this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
          this.user = res1;
          this.equity = this.user.equity;
      });

      this.httpService.get('confs/1').subscribe((res) => {
          console.log(res);
          this.conf = res;
          this.total = this.conf.equity;
          this.exchanged = this.conf.exchanged;
          this.rate = this.conf.equityGXBRate;
      });
  }

}
