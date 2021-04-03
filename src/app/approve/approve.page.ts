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
  applyid: string;
  approved: boolean;
  denied: boolean;
  approveCode: number;
  denyCode: number;
  code: number;
  choice = -1;
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
      this.denyCode = 3;
      this.approveCode = 4;
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
      console.log(this.choice);
  }

  approve() {
      let code;
      let msg;
      if (this.choice === 1){
          code = this.approveCode;
          msg = '已审核通过！';
      }
      else{
          code = this.denyCode;
          msg = '已拒绝！';
      }
      this.httpService.patch('applies/' + this.applyid, {status: '/api/statuses/' + code}).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast(msg);
          this.location.back();
      });
      console.log(this.choice);
  }

  check(e){
      this.choice = parseInt(e.detail.value, 10);
  }
}
