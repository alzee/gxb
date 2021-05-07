import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {
  recommendUntil: Date;
  amount: number;
  tid: number;
  title: string;
  message: Data;
  userData: Data;
  user: Data;
  orderType = 3;
  orderNote = '任务推荐';

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
      private storageService: StorageService,
      private data: DataService
  ) {
      this.recommendUntil = new Date();
      this.recommendUntil.setHours(this.recommendUntil.getHours() + 24);
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.tid = params.tid;
          this.title = params.title;
      });

      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              this.amount = this.user.level.recommendPrice;
          });
      });
  }

  validate(): number {
      return 0;
  }

  recomm(){
    if (this.validate() === 1) {
    }
    else {
      const postData = {
        recommendUntil: this.recommendUntil
      };
      const orderData = {
        type: this.orderType,
        note: this.orderNote,
        amount: this.amount,
        data: {
            entityId: this.tid,
            postData
        }
      };
      this.message = {
          orderData
      };
      this.data.changeMessage(this.message);
      this.router.navigate(['/pay'], { replaceUrl: true });
    }
  }
}
