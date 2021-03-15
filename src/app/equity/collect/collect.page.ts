import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-collect',
  templateUrl: './collect.page.html',
  styleUrls: ['./collect.page.scss'],
})
export class CollectPage implements OnInit {
  hists = [];
  uid: number;
  postData ={
      amount: 1,
      user: '',
  } ;
  //amount: number = 1;

  constructor(
      private storageService: StorageService,
      private toastService: ToastService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.uid = res.id;
      this.httpService.get('gxbs?page=1&itemsPerPage=30&user=' + this.uid).subscribe((res) => {
          this.hists = res;
          console.log(res);
          console.log(this.uid);
      });
    });
  }

  collectGxb() {
      //this.postData.amount = this.amount;
      this.postData.user = '/api/users/' + this.uid;
      this.httpService.post('gxbs', this.postData).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('GXB +1');
          this.ngOnInit();
      });
      console.log('collected');
  }

}
