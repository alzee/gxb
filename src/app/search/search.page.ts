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
  query = 'status=2&itemsPerPage=20';

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.keyword = params.keyword;
          console.log(this.keyword);
      });

      this.httpService.get(`tasks?${this.query}&title=${this.keyword}`).subscribe((res) => {
          this.tasks = [...this.tasks, ...res];
          console.log(res);
      });

      if (Number.isInteger(this.keyword)) {
        this.httpService.get(`tasks?${this.query}&id=${this.keyword}`).subscribe((res) => {
          this.tasks = [...this.tasks, ...res];
          console.log(res);
        });
      }

      this.httpService.get(`tasks?${this.query}&owner.username=${this.keyword}`).subscribe((res) => {
          this.tasks = [...this.tasks, ...res];
          console.log(res);
      });
  }

}
