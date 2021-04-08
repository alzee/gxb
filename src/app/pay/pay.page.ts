import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import {Location} from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  total: number;
  prevUrl: string;
  subscription: Subscription;
  message: Data;
  url: string;
  postData: Data;

  constructor(
      private activeRoute: ActivatedRoute,
      private router: Router,
      private location: Location,
      private data: DataService
  ) { }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      this.total = this.message.price;
      this.url = this.message.url;
      this.postData = this.message.data;
      console.log(this.message);

      // use service instead of query params
      // this.activeRoute.queryParams.subscribe((params: Params) => {
      //     this.total = params.total;
      // });

      // this.router.events.pipe(filter((e: any) => e instanceof RoutesRecognized),
      //                         pairwise()
      //                        ).subscribe((e: any) => {
      //                          this.prevUrl = e[0].urlAfterRedirects; // previous url
      //                          console.log(this.prevUrl);
      //                        });
  }

  pay() {
    // this.location.back();
    this.router.navigate(['land/occupy'], {queryParams: {paid: 'n'}});
  }
}
