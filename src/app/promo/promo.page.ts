import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {
  recommendUntil:Datetime;
  price: number;
  tid: number;
  title: string;

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastService
  ) {
      this.price = 9;
      this.recommendUntil= new Date();
      this.recommendUntil.setHours(this.recommendUntil.getHours() + 24);
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.tid = params['tid'];
          this.title = params['title'];
      });
  }

  validate(){
  }

  recomm(){
    if(this.validate() == 1){
    }
    else{
      let data = {
        "recommendUntil": this.recommendUntil
      };
      this.httpService.patch('tasks/' + this.tid, data).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('推荐成功！');
          this.router.navigate(['/myposts']);
      });
    }
  }
}
