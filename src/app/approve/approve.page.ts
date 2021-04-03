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
  pass: boolean;
  applyid = '';
  approved: boolean;
  approveCode: number = 4;
  data = {
    //status: "/api/statuses/3",
    status: "/api/statuses/4",
  };
  guides = [];
  reviews = [];
  workPics = [];
  apply: Data;

  constructor(
    private toastService: ToastService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private _location: Location,
      private router: Router
  ) { }

  ngOnInit() {
      this.approved = false;
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.applyid = params['applyid'];
        this.httpService.get('applies/' + this.applyid).subscribe((res) => {
          this.apply = res;
          if(this.apply.status.id == 4){
              this.approved = true;
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
      this.httpService.patch('applies/' + this.applyid, this.data).subscribe((res) => {
        console.log(res);
        this.toastService.presentToast('审核通过');
        this._location.back();
      });
  }

  checkPass(){
  }
}
