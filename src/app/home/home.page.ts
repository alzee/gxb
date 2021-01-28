import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { TaskDataService } from '../services/task-data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //http = HttpService;
  //http: HttpService;
  bids = [];
  tasks = [];
  envs = environment;
  constructor(
      //private taskDataService: TaskDataService,
      private httpService: HttpService
  ) {
     // taskDataService.data.subscribe((res) => {
     //     this.tasks = res;
     //     console.log(res);
     // });
  }

  ngOnInit() {
      this.httpService.get('tasks?order%5BbidPosition%5D=asc&bidPosition%5Bgt%5D=0&page=1').subscribe((res) => {
          this.bids = res;
          console.log(res);
      });
      this.httpService.get('tasks?page=1&sticky=true&recommended=true&order%5Bsticky%5D=desc').subscribe((res) => {
          this.tasks = res;
          console.log(res);
      });
  }

  public bids0 = [
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/detail',
    },
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/detail',
    },
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/detail',
    },
    {
      avatar: '../assets/img/she.png',
      title: '任务名称',
      cate: '账号注册',
      proc: '正在进行',
      no: 12345,
      price: 55.5,
      link: '/detail',
    },
  ];

  public features = [
    {
      link: '/mytasks',
      img: '../assets/img/bag.png',
      name: '悬赏管理',
    },
    {
      link: '/publish',
      img: '../assets/img/flag.png',
      name: '发布悬赏',
    },
    {
      link: '/myposts',
      img: '../assets/img/note.png',
      name: '发布管理',
    },
    {
      link: '/bonus',
      img: '../assets/img/wallet.png',
      name: '全民分红',
    },
    {
      link: '/land',
      img: '../assets/img/land.png',
      name: '我的领地',
    },
    {
      link: '/equity',
      img: '../assets/img/equity.png',
      name: '股权',
    },
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
}
