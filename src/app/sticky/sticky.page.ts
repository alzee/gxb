import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  price: number;
  tid: number;
  title: string;
  subscription: Subscription;
  message: Data;

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
      private data: DataService
  ) {
      this.price = 9;
  }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);

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
      this.message = {
          price: this.price,
          postData,
          url: 'tasks/' + this.tid

      };
      this.data.changeMessage(this.message);
      this.router.navigate(['/pay'], { replaceUrl: true });
      // this.httpService.patch('tasks/' + this.tid, data).subscribe((res) => {
      //     console.log(res);
      //     this.toastService.presentToast('置顶成功！');
      //     // this.router.navigate(['/myposts'], { replaceUrl: true });
      //     this.router.navigate(['/pay'], { replaceUrl: true });
      // });
    }
  }
}
