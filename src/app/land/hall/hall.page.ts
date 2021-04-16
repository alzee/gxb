import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { DataService } from '../../services/data.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {
  url = environment.url;
  sales = [];
  message: Data;
  userData: Data;
  orderType = 7;
  orderNote = '领地交易';

  constructor(
      private toastService: ToastService,
      private storageService: StorageService,
      private router: Router,
      private httpService: HttpService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.httpService.get('lands?page=1&itemsPerPage=5&forSale=true').subscribe((res) => {
          this.sales = res;
          console.log(res);
      });
  }

  buy(i){
      if (i.owner.id === this.userData.id) {
          this.toastService.presentToast('您拥有领地 - ' + i.name);
          return;
      }
      const postData = {
          prePrice: i.price,
          owner: '/api/users/' + this.userData.id,
          forSale: false
      };
      const orderData = {
          type: this.orderType,
          note: this.orderNote,
          amount: i.price / 100
      };
      this.message = {
          orderData,
          postData,
          url: 'lands/' + i.id,
          httpMethod: 'patch'
      };
      this.data.changeMessage(this.message);
      this.router.navigate(['/pay'], { replaceUrl: true });
      // this.router.navigate(['/pay']);
  }
}
