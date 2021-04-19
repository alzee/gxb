import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { DataService } from '../services/data.service';

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
  amount = 9;
  tid: number;
  title: string;
  message: Data;
  orderType = 2;
  orderNote = '任务置顶';

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
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
            entity: 'Task',
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
