import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  node: Data;
  id: number;
  // pipe = new DatePipe('en-US');

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params.id;
          this.httpService.get('nodes/' + this.id).subscribe((res) => {
            this.node = res;
            // this.node.date = this.pipe.transform(Date.now(), 'short');
            console.log(this.node);
          });
      });

  }

}
