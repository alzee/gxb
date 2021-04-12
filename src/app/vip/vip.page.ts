import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-vip',
  templateUrl: './vip.page.html',
  styleUrls: ['./vip.page.scss'],
})
export class VipPage implements OnInit {
  message: Data;
  userData: Data;
  levels = [];
  orderType = 8;
  orderNote = '购买会员';

  constructor(
      private router: Router,
      private httpService: HttpService,
      private storageService: StorageService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.httpService.get('levels?itemsPerPage=10&order%5Blevel%5D=asc').subscribe((res) => {
          this.levels = res;
          console.log(res);
      });
  }

  buyVip(l: number){
    console.log(this.levels[l]);
    const postData = {
        level: '/api/levels/' + this.levels[l].id
    };
    const orderData = {
        type: this.orderType,
        note: this.orderNote,
        amount: this.levels[l].price
    };
    this.message = {
        orderData,
        postData,
        url: 'users/' + this.userData.id,
        httpMethod: 'patch'
    };
    this.data.changeMessage(this.message);
    this.router.navigate(['/pay'], { replaceUrl: true });
  }
}
