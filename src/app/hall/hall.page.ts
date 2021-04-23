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
  query = 'status=2';
  pageR = 1;
  pageD = 1;
  pageP = 1;
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
      this.httpService.get(`tasks?page=${this.pageD}&${this.query}&order%5Bdate%5D=desc`).subscribe((res) => {
          this.tasksByDate = [...this.tasksByDate, ...res];
      });
      this.httpService.get(`tasks?page=${this.pageP}&${this.query}&order%5Bprice%5D=desc`).subscribe((res) => {
          this.tasksByPrice = [...this.tasksByPrice, ...res];
      });
      this.getTaskByRecomm();
  }

  ionViewWillEnter(){
  }

  getTaskByRecomm(){
      this.httpService.get(`tasks?page=${this.pageR}&${this.query}&order%5BrecommendUntil%5D=desc`).subscribe((res) => {
          this.tasksByRecommend = [...this.tasksByRecommend, ...res];
          this.tasks = this.tasksByRecommend;
      });
  }

  getTaskByDate(){
      this.httpService.get(`tasks?page=${this.pageD}&${this.query}&order%5Bdate%5D=desc`).subscribe((res) => {
          this.tasksByDate = [...this.tasksByDate, ...res];
          this.tasks = this.tasksByDate;
      });
  }

  getTaskByPrice(){
      this.httpService.get(`tasks?page=${this.pageP}&${this.query}&order%5Bprice%5D=desc`).subscribe((res) => {
          this.tasksByPrice = [...this.tasksByPrice, ...res];
          this.tasks = this.tasksByPrice;
      });
  }

  segmentChanged(ev: any) {
    this.seg = ev.detail.value;
    switch (this.seg) {
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
    console.log('Segment changed', this.seg);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.tasksByPrice = [];
    this.tasksByDate = [];
    this.tasksByRecommend = [];
    this.pageP = 1;
    this.pageD = 1;
    this.pageR = 1;
    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      this.seg = 'all';
      this.getTaskByRecomm();
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      switch (this.seg) {
          case 'all':
              this.pageR += 1;
              this.getTaskByRecomm();
              break;
          case 'date':
              this.pageD += 1;
              this.getTaskByDate();
              break;
          case 'price':
              this.pageP += 1;
              this.getTaskByPrice();
              break;
      }

      if (this.tasks.length === 50) {
          event.target.disabled = true;
      }
    }, 500);
  }
}
