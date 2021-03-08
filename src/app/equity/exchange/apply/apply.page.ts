import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../../config/auth-constants';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {
  uid: number;
  gxb: number;
  rate: number;
  equity: number = 0;
  max: number;
  userData: Data;

  constructor(
      private httpService: HttpService,
      private storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
      this.uid = this.userData.id;
      this.httpService.get('users/' + this.uid).subscribe((res) => {
          this.userData = res;
          this.gxb = this.userData.gxb;
          console.log(this.gxb);
      });
    });

    this.httpService.get('configs?page=1&label=exchangePirce').subscribe((res) => {
        this.rate = 1 / res[0].value;
        console.log(this.rate);
    });
  }

  buyMax(){
      this.max = this.gxb / this.rate;
      this.equity = Math.trunc(this.max);
  }
}
