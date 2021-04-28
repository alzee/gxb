import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {
  envs = environment;
  seg = 1;
  userData: Data;
  query1 = 'page=1&itemsPerPage=100';
  query2 = 'page=1&itemsPerPage=100';
  friends1: Array<Data>;
  friends2: Array<Data>;
  friends: Array<Data>;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    const d = new Date();
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then(
      (res) => {
        this.userData = res;
        this.httpService.get(`users?${this.query1}&referrer=${this.userData.id}`).subscribe((res1) => {
          console.log(res1);
          this.friends1 = res1;
          this.friends = this.friends1;
        });
        this.httpService.get(`users?${this.query2}&ror=${this.userData.id}`).subscribe((res2) => {
          this.friends2 = res2;
        });
      });
  }

  segmentChanged(ev: any) {
    this.seg = +ev.detail.value;
    switch (this.seg) {
      case 1:
        this.friends = this.friends1;
        break;
      case 2:
        this.friends = this.friends2;
      console.log(this.friends);
        break;
    }
    console.log('Segment changed', this.seg);
  }
}
