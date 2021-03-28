import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  keyword: string;
  tasks = [];
  envs = environment;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.keyword = params['keyword'];
          console.log(this.keyword);
      });

      this.httpService.get('tasks?page=1').subscribe((res) => {
          this.tasks = res;
          console.log(res);
      });
  }

}
