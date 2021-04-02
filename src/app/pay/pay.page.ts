import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import {Location} from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  total: number;
  prevUrl: string;

  constructor(
      private activeRoute: ActivatedRoute,
      private router: Router,
      private _location: Location
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.total = params['total'];
      });
      //this.router.events.pipe(filter((e: any) => e instanceof RoutesRecognized),
      //                        pairwise()
      //                       ).subscribe((e: any) => {
      //                         this.prevUrl = e[0].urlAfterRedirects; // previous url
      //                         console.log(this.prevUrl);
      //                       });
  }

  pay() {
    //this._location.back();
    this.router.navigate(["land/occupy"], {queryParams: {paid: 'n'}});
  }
}
