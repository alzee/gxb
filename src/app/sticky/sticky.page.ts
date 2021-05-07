import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { DataService } from '../services/data.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.page.html',
  styleUrls: ['./sticky.page.scss'],
})
export class StickyPage implements OnInit {
  stickyUntil: Date;
  amount: number;
  tid: number;
  title: string;
  message: Data;
  userData: Data;
  user: Data;
  orderType = 2;
  orderNote = '任务置顶';

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
      private storageService: StorageService,
      private data: DataService
  ) {
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.tid = params.tid;
          this.title = params.title;
      });
      this.stickyUntil = new Date();
      this.stickyUntil.setHours(this.stickyUntil.getHours() + 24);

      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              this.amount = this.user.level.stickyPrice;
          });
      });
  }

  validate(): number {
      return 0;
  }

  sticky(){
    if (this.validate() === 1){
    }
    else {
      const postData = {
        stickyUntil: this.stickyUntil
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
