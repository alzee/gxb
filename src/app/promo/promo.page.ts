import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  amount = 9;
  tid: number;
  title: string;
  subscription: Subscription;
  message: Data;
  orderType = 2;
  orderNote = '任务推荐';

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
      private data: DataService
  ) {
      this.recommendUntil = new Date();
      this.recommendUntil.setHours(this.recommendUntil.getHours() + 24);
  }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);

      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.tid = params.tid;
          this.title = params.title;
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
        amount: this.amount
      };
      this.message = {
          orderData,
          postData,
          url: 'tasks/' + this.tid,
          httpMethod: 'patch'
      };
      this.data.changeMessage(this.message);
      this.router.navigate(['/pay'], { replaceUrl: true });
    }
  }
}
