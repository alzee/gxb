import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.page.html',
  styleUrls: ['./approve.page.scss'],
})
export class ApprovePage implements OnInit {
  url = environment.url;
  pass: boolean;
  applyid = '';
  data = {
    //status: "/api/statuses/3",
    status: "/api/statuses/4",
  };
  guides = [];
  workPics = [];

  constructor(
    private toastService: ToastService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private _location: Location,
      private router: Router
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.applyid = params['applyid'];
        this.httpService.get('applies/' + this.applyid).subscribe((res) => {
          this.guides = res.task.guides;
          this.workPics = res.pic;
          console.log(this.guides);
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

  checkPass(e){
    console.log(e);
  }
}
