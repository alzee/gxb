import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {
  keyword: string;
  tasks = [];
  tasksByRecommend = [];
  tasksByDate = [];
  tasksByPrice = [];
  envs = environment;
  seg = 'all';
  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  public sorts = [
    {
      value: 'all',
      label: '悬赏大厅',
    },
    {
      value: 'date',
      label: '最新任务',
    },
    {
      value: 'price',
      label: '高价任务',
    },
  ];
  public cate = [
    '下载APP',
    '账号注册',
    '认证绑卡',
    '电商相关',
    '简单关注',
    '简单转发',
    '投票/砍价',
    '推广引流',
    '其它任务',
  ];

  constructor(
      private router: Router,
      private httpService: HttpService
  ) {
  }

  ngOnInit() {
      this.httpService.get('tasks?page=1&paused=false&stopped=false&order%5BrecommendUntil%5D=desc').subscribe((res) => {
          this.tasksByRecommend = res;
          this.tasks = this.tasksByRecommend;
          console.log(res);
      });
      this.httpService.get('tasks?page=1&paused=false&stopped=false&order%5Bdate%5D=desc').subscribe((res) => {
          this.tasksByDate = res;
          console.log(res);
      });
      this.httpService.get('tasks?page=1&paused=false&stopped=false&order%5Bprice%5D=desc').subscribe((res) => {
          this.tasksByPrice = res;
          console.log(res);
      });
  }

  segmentChanged(ev: any) {
    this.tasks = this.tasksByPrice;
    switch (ev.detail.value) {
        case this.sorts[0].value:
            this.tasks = this.tasksByRecommend;
            break;
        case this.sorts[1].value:
            this.tasks = this.tasksByDate;
            break;
        case this.sorts[2].value:
            this.tasks = this.tasksByPrice;
            break;

    }
    console.log('Segment changed', ev.detail.value);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.seg = 'all';
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  search(){
    if (this.keyword) {
      console.log(this.keyword);
      this.router.navigate(['/search'], {queryParams: {keyword: this.keyword}});
    }
  }

  isFuture(time: string){
    return new Date(time).getTime() > new Date().getTime();
  }
}
