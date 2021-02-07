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

  constructor(
      private activeRoute: ActivatedRoute,
      private storageService: StorageService,
      private httpService: HttpService,
      private router: Router,
  ) {
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.taskId = params['task'];
          this.httpService.get('applies?task.id=' + this.taskId).subscribe((res) => {
              console.log(res);
              this.applies = res;
          });
      });
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
