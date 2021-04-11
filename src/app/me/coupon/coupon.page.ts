import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {
  coupons: Array;
  message: Data;
  subscription: Subscription;

  constructor(
      private data: DataService
  ) { }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      console.log(this.message);
      this.user = this.message.user;
      this.coupons = this.user.coupon;
      console.log(this.subscription);
  }

  getLink(type: number){
      switch (type) {
          case 1:
              return '/publish';
          case 2:
              return '/myposts';
          case 3:
              return '/myposts';
          case 4:
              return '/vip';
      }
  }

}
