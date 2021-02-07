import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {
  applies = [];
  applies0 = [];
  applies1 = [];
  applies2 = [];
  applies3 = [];
  applies4 = [];
  userData = {
      id: 0
  };
  envs = environment;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) {
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('applies?applicant.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.applies0 = res;
              this.applies = this.applies0;
          });
          this.httpService.get('applies?status.id=1&applicant.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.applies1 = res;
          });
          this.httpService.get('applies?status.id=2&applicant.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.applies2 = res;
          });
          this.httpService.get('applies?status.id=3&applicant.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.applies3 = res;
          });
          this.httpService.get('applies?status.id=4&applicant.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.applies4 = res;
          });
      });
  }

  segmentChanged(ev: any) {
    this.applies = this.applies0;
    switch(ev.detail.value){
        case this.statuses[0].value:
            this.applies = this.applies0;
            break;
        case this.statuses[1].value:
            this.applies = this.applies1;
            break;
        case this.statuses[2].value:
            this.applies = this.applies2;
            break;
        case this.statuses[3].value:
            this.applies = this.applies3;
            break;
        case this.statuses[4].value:
            this.applies = this.applies4;
            break;
    }
    console.log('Segment changed', ev.detail.value);
  }

  public statuses = [
    {
      value: '0',
      label: '全部',
    },
    {
      value: '1',
      label: '待提交',
    },
    {
      value: '2',
      label: '审核中',
    },
    {
      value: '3',
      label: '不合格',
    },
    {
      value: '4',
      label: '已完成',
    },
  ];

}
