import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.page.html',
  styleUrls: ['./approve.page.scss'],
})
export class ApprovePage implements OnInit {
  applyid = '';
  data = {
    status: "/api/statuses/4"
  };

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
      });
  }

  approve() {
      this.httpService.patch('applies/' + this.applyid, this.data).subscribe((res) => {
        console.log(res);
        this.toastService.presentToast('审核通过');
        this._location.back();
      });
  }


}
