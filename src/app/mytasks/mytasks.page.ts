import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {
  applies = [];
  seg = 0;
  userData = {
      id: 0
  };
  envs = environment;

  public statuses = [
    {
      id: 0,
      label: '全部',
    },
    {
      id: 11,
      label: '待提交',
    },
    {
      id: 12,
      label: '审核中',
    },
    {
      id: 13,
      label: '审核拒绝',
    },
    {
      id: 14,
      label: '已完成',
    },
  ];

  constructor(
      private storageService: StorageService,
      private httpService: HttpService,
      private router: Router
  ) {
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('applies?page=1&itemsPerPage=30&order%5Bdate%5D=desc&applicant.id=' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.applies = res1;
          });
      }, (rej) => {
      });
  }

  segmentChanged(ev: any) {
    this.seg = ev.detail.value;
    console.log(this.seg);
  }
}
