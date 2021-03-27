import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../services/task-data.service';
import { HttpService } from '../services/http.service';
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
  bondary: string;
  news = [];
  envs = environment;
  constructor(
      private httpService: HttpService
  ) {
      const date: Date = new Date();
      // imply 00:00:00
      this.bondary = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  ngOnInit() {
      for (let i = 0; i < 4; i++){
          this.httpService.get(`bids?page=1&itemsPerPage=1&position=${i+1}&order%5Bdate%5D=desc&date%5Bbefore%5D=${this.bondary}`).subscribe((res) => {
              this.bids[i] = res[0];
              console.log(this.bids);
          });
      }
      console.log(this.bondary);
      this.httpService.get('tasks?page=1&order%5BstickyUntil%5D=desc').subscribe((res) => {
          this.tasks = res;
          console.log(res);
      });
      this.httpService.get('nodes?page=1&itemsPerPage=1&type.id=3').subscribe((res) => {
          this.news = res;
          console.log(res);
      });
  }

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

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
