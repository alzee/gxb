import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {
  posts: Data;
  url = environment.url;

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
      this.httpService.get('nodes?order%5Bid%5D=desc&type.id=2').subscribe((res) => {
          this.posts = res;
          console.log(this.posts);
      });
  }

  new(){
  }
}
