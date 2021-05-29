import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applies',
  templateUrl: './applies.page.html',
  styleUrls: ['./applies.page.scss'],
})
export class AppliesPage implements OnInit {
  taskId = '';
  applies = [];
  envs = environment;
  page = 1;
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

  constructor(
      private activeRoute: ActivatedRoute,
      private storageService: StorageService,
      private httpService: HttpService,
      private router: Router,
  ) {
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.taskId = params.task;
          this.applies = [];
          this.getApplies();
      });
  }

  check(i) {
      if (i.status.id >= 12) {
          this.router.navigate(['/approve'], {queryParams: {applyid: i.id}});
      }
  }

  getApplies() {
      this.httpService.get(`applies?itemsPerPage=7&page=${this.page}&order%5Bid%5D=desc&task.id=${this.taskId}`).subscribe((res) => {
          console.log(res);
          this.applies = [...this.applies, ...res];
      });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.page += 1;
      this.getApplies();
    }, 500);
  }
}
