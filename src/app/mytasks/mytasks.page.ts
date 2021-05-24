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
  seg = 11;
  page = 1;
  userData = {
      id: 0
  };
  query = `itemsPerPage=7&order%5Bid%5D=desc`;
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
      label: '验收中',
    },
    {
      id: 13,
      label: '不合格',
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
          this.getMyTasks();
      }, (rej) => {
      });
  }

  segmentChanged(ev: any) {
    this.seg = ev.detail.value;
    console.log(this.seg);
  }

  getMyTasks() {
      this.httpService.get(`applies?${this.query}&page=${this.page}&applicant.id=${this.userData.id}`).subscribe((res) => {
          this.applies = [...this.applies, ...res];
      });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.page += 1;
      this.getMyTasks();
    }, 500);
  }
}
