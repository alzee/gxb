import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  tasks = [];
  envs = environment;

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.httpService.get('tasks?page=1').subscribe((res) => {
          this.tasksByRecommend = res;
          this.tasks = this.tasksByRecommend;
          console.log(res);
      });
  }

}
