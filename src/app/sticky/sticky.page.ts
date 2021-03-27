import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.page.html',
  styleUrls: ['./sticky.page.scss'],
})
export class StickyPage implements OnInit {
  stickyUntil:Datetime;
  price: number = 9;
  days: number = 1;
  total: number = this.price * this.days;
  tid: number;
  title: string;

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.tid = params['tid'];
          this.title = params['title'];
      });
      this.stickyUntil = new Date();
      this.stickyUntil.setHours(this.stickyUntil.getHours() + 24);
  }

  validate(){
  }

  sticky(){
    if(this.validate() == 1){
    }
    else{
      let data = {
        "stickyUntil": this.stickyUntil
      };
      this.httpService.patch('tasks/' + this.tid, data).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('置顶成功！');
          this.router.navigate(['/myposts'], { replaceUrl: true });
      });
    }
  }
}
