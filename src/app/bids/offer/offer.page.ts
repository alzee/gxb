import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';

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
  data: Data = {
      task: 0,
      bid: 0,
      position: 0
  };

  constructor(
      private storageService: StorageService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private toastService: ToastService
  ) {
      this.date = new Date();
      this.today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
      this.min = 19;
      this.step = 5;
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('tasks?paused=false&stopped=false&order%5Bdate%5D=desc&owner.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.myposts = res;
          });
      });
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.position = parseInt(params.id, 10);
      });
      this.httpService.get(
          `bids?page=1&order%5Bdate%5D=desc&itemsPerPage=10&position=${this.position}&date%5Bafter%5D=${this.today}`
      ).subscribe((res) => {
        console.log(res);
        this.bids = res;
        if (this.bids.length > 0) {
            this.min = this.bids[0].bid + this.step;
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

  bid(){
    this.data.task = '/api/tasks/' + this.post;
    this.data.bid = this.myBid;
    this.data.position = this.position;
    console.log(this.myBid);
    console.log(this.post);
    console.log(this.position);
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
            this.httpService.post('bids', this.data).subscribe((res) => {
            console.log(res);
            this.ngOnInit();
        });
    }
  }

}
