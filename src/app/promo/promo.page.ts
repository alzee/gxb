import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {
  price: number = 9;
  days: number = 1;
  total: number = this.price * this.days;
  tid: number;
  title: string;
  thatDay = new Date();

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
  }

  validate(){
    if(!this.days){
      return 1;
    }
  }

  recomm(){
    if(this.validate() == 1){
      this.toastService.presentToast('请填写天数');
    }
    else{
      console.log(this.thatDay);
      this.thatDay.setDate(this.thatDay.getDate() + this.days);
      console.log(this.thatDay);
      let data = {
        "recommendUntil": this.thatDay
      };
      this.httpService.patch('tasks/' + this.tid, data).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('推荐成功！');
          this.router.navigate(['/myposts']);
      });
    }
  }
}
