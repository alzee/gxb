import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss'],
})
export class MypostsPage implements OnInit {
  userData = {
      id: 0
  };
  tasks = [];
  envs = environment;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService,
      private router: Router
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('tasks?order%5Bdate%5D=desc&owner.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.tasks = res;
          });
      }, (rej) => {
          this.router.navigate(['/signin']);
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
