import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-vip',
  templateUrl: './vip.page.html',
  styleUrls: ['./vip.page.scss'],
})
export class VipPage implements OnInit {
  message: Data;
  userData: Data;
  user: Data;
  levels = [];
  orderType = 8;
  orderNote = '购买会员';

  constructor(
      private router: Router,
      private httpService: HttpService,
      private storageService: StorageService,
      private toastService: ToastService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      this.user = this.message.user;
      console.log(this.user);

      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.httpService.get('levels?itemsPerPage=10&order%5Blevel%5D=asc').subscribe((res) => {
          this.levels = res;
      });
  }

  buyVip(l: Data){
    if (l.level <= this.user.level.level) {
        this.toastService.presentToast(`您的当前等级已经是 V${this.user.level.level} 喽！`);
        return;
    }
    const postData = {
        levelId: l.id
    };
    const orderData = {
        type: this.orderType,
        note: this.orderNote,
        amount: l.price,
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
