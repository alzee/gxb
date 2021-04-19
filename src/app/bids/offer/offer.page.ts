import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  date: Date;
  today: string;
  position: number;
  myposts: Data;
  bids: Array<Data>;
  myBid: number;
  post: number;
  min: number;
  step: number;
  buyNowPrice = 99;
  buyOut = false;
  userData: Data;
  message: Data;
  orderType = 4;
  orderNote = '任务竞价';
  taskQuery = 'status=2&order%5Bdate%5D=desc';
  bidQuery = 'page=1&order%5Bdate%5D=desc&itemsPerPage=10';

  constructor(
      private storageService: StorageService,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private httpService: HttpService,
      private toastService: ToastService,
      private data: DataService
  ) {
      this.date = new Date();
      this.today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
      this.min = 19;
      this.step = 5;
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get(`tasks?${this.taskQuery}&owner.id=${this.userData.id}`).subscribe((res1) => {
              console.log(res1);
              this.myposts = res1;
          });
      });
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.position = parseInt(params.id, 10);
      });
      this.httpService.get(
          `bids?${this.bidQuery}&position=${this.position}&date%5Bafter%5D=${this.today}`
      ).subscribe((res) => {
        console.log(res);
        this.bids = res;
        if (this.bids.length > 0) {
            this.min = this.bids[0].price / 100 + this.step;
            if (this.bids[0].isBuyNow) {
                this.buyOut = true;
            }
        }
      });
  }

  validate(){
      if (!this.post) {
          return 1;
      }
      if (!this.myBid || this.myBid < this.min) {
          return 2;
      }
  }

  bid(isBuyNow: boolean){
    if (isBuyNow) {
        this.myBid = this.buyNowPrice;
    }
    const postData = {
        taskId: this.post,
        price: Math.round(this.myBid * 100),
        position: this.position,
        isBuyNow: isBuyNow
    };
    switch (this.validate()) {
        case 1:
            console.log('choose post');
            this.toastService.presentToast('请选择任务');
            break;
        case 2:
            console.log('min');
            this.toastService.presentToast('最低出价' + this.min + '元');
            break;
        default:
            const orderData = {
                type: this.orderType,
                note: this.orderNote,
                amount: postData.price / 100,
                data: {
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
