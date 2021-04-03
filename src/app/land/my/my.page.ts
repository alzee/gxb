import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
  envs = environment;
  income: number = 0;
  profit: number = 0;
  transProfit: number = 0;
  myLands = [];
  sold = [];
  uid: number;
  seg: string = 'my';
  showSold: boolean = false;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.uid = res.id;
      console.log(this.uid);
      this.httpService.get('lands?page=1&itemsPerPage=30&owner.id=' + this.uid).subscribe((res1) => {
          this.myLands = res1;
          console.log(res1);
      });
    });
  }

  segChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    console.log(this.seg);
    if (this.seg === 'my') {
      this.showSold = false;
    }
    else {
      this.showSold = true;
    }
  }
}
