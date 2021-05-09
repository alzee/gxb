import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  ranking: Array<Data>;
  envs = environment;

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.get('ranking').subscribe((res) => {
      console.log(res);
      this.ranking = res;
    });
  }

}
