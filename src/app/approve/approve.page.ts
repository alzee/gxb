import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-approve',
  templateUrl: './approve.page.html',
  styleUrls: ['./approve.page.scss'],
})
export class ApprovePage implements OnInit {
  url = environment.url;
  applyid = '';
  approved: boolean;
  denied: boolean;
  approveCode: number = 4;
  denyCode: number = 3;
  code: number;
  choice: number;
  msg: string;
  guides = [];
  reviews = [];
  workPics = [];
  apply: Data;

  constructor(
      private toastService: ToastService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private location: Location,
      private router: Router
  ) {
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.applyid = params.applyid;
          this.httpService.get('applies/' + this.applyid).subscribe((res) => {
              this.apply = res;
              if (this.apply.status.id === this.approveCode) {
                  this.approved = true;
                  this.choice = 1;
              }
              if (this.apply.status.id === this.denyCode) {
                  this.denied = true;
                  this.choice = 0;
              }
              this.reviews = this.apply.task.reviews;
              this.workPics = this.apply.pic;
              console.log(this.apply);
              console.log(this.reviews);
              console.log(this.workPics);
          });
      });
  }

  approve() {
      if (this.choice === 1){
          const code = this.approveCode;
          const msg = '已审核通过！';
      }
      else{
          const code = this.denyCode;
          const msg = '已拒绝！';
      }
      this.httpService.patch('applies/' + this.applyid, {status: '/api/statuses/' + code}).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast(msg);
          this.location.back();
      });
      console.log(this.choice);
  }

  check(e){
      this.choice = e.detail.value;
  }
}
