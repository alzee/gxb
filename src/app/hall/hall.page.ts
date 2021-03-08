import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../services/task-data.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {
  tasks = [];
  tasksBySticky = [];
  tasksByDate = [];
  tasksByPrice = [];
  envs = environment;
  seg = 'all';

  constructor(
      //private taskDataService: TaskDataService,
      private httpService: HttpService
  ) {
      //taskDataService.data.subscribe((res) => {
      //    this.tasks = res;
      //    console.log(res);
      //});
  }

  ngOnInit() {
      this.httpService.get('tasks?page=1&order%5Bsticky%5D=desc').subscribe((res) => {
          this.tasksBySticky = res;
          this.tasks = this.tasksBySticky;
          console.log(res);
      });
      this.httpService.get('tasks?page=1&order%5Bdate%5D=desc').subscribe((res) => {
          this.tasksByDate = res;
          console.log(res);
      });
      this.httpService.get('tasks?page=1&order%5Bprice%5D=desc').subscribe((res) => {
          this.tasksByPrice = res;
          console.log(res);
      });
  }

  segmentChanged(ev: any) {
    this.tasks = this.tasksByPrice;
    switch(ev.detail.value){
        case this.sorts[0].value:
            this.tasks = this.tasksBySticky;
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

  public sorts= [
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
  public tasks0 = [
    {
      boss: 'jess',
      avatar: '../assets/img/she.png',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: ['reg'],
      sticky: true,
      price: 55.5,
      link: '/detail',
    },
    {
      boss: 'mike',
      avatar: '../assets/img/she.png',
      title: '任务名称',
      runner: 88,
      left: 12,
      cate: ['reg', 'save'],
      sticky: false,
      price: 55.5,
      link: '/detail',
    },
  ];

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.seg = 'all';
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }
}
