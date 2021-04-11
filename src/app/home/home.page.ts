import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  keyword: string;
  bids = [] ;
  tasks = [];
  bondary: string;
  news = [];
  envs = environment;
  page = 1;
  bidQuery = 'page=1&itemsPerPage=1&paused=false&stopped=false&order%5Bdate%5D=desc';
  taskQuery = 'paused=false&stopped=false&order%5BstickyUntil%5D=desc';
  newsQuery = 'page=1&itemsPerPage=3&type.id=3';
  infiniteScroll: IonInfiniteScroll;
  slideOpts = {
      autoplay: {
          delay: 2000,
          disableOnInteraction: false
      },
      slidesPerView: 1,
      direction: 'vertical',
      loop: true,
      height: 40
  };

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

  constructor(
      private router: Router,
      private httpService: HttpService
  ) {
      const date: Date = new Date();
      // imply 00:00:00
      this.bondary = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  ngOnInit() {
      for (let i = 0; i < 4; i++){
          this.httpService.get(
              `bids?position=${i + 1}&date%5Bbefore%5D=${this.bondary}&${this.bidQuery}`
          ).subscribe((res) => {
              this.bids[i] = res[0];
              console.log(this.bids);
          });
      }
      this.httpService.get(`nodes?${this.newsQuery}`).subscribe((res) => {
          this.news = res;
          // console.log(res);
      });
      this.getTasks();
  }

  getTasks(){
      this.httpService.get(`tasks?page=${this.page}&${this.taskQuery}`).subscribe((res) => {
          this.tasks = [...this.tasks, ...res];
          console.log(res);
      });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.tasks = [];
    this.page = 1;
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getTasks();
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
      this.page += 1;
      this.getTasks();

      if (this.tasks.length === 50) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
