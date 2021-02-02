import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss'],
})
export class MypostsPage implements OnInit {
  tasks = [];
  envs = environment;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('tasks?owner.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.tasks = res;
          });
      });
  }

  public statuses = [
    {
      value: 'all',
      label: '全部',
    },
    {
      value: 'published',
      label: '已上架',
    },
    {
      value: 'paused',
      label: '已暂停',
    },
    {
      value: 'prePub',
      label: '待上架',
    },
    {
      value: 'done',
      label: '已完成',
    },
  ];

  public actions = [
    {
      value: 'edit',
      label: '修改',
      link: '/edit',
    },
    {
      value: 'pause',
      label: '暂停',
      link: '/pause',
    },
    {
      value: 'unPublish',
      label: '下架',
      link: '/unpublish',
    },
    {
      value: 'sticky',
      label: '置顶',
      link: '/sticky',
    },
    {
      value: 'promo',
      label: '推荐',
      link: '/promo',
    },
  ];
}
