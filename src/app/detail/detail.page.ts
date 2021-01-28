import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  data = {};
  owner = {};
  //avatar = {};
  envs = environment;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params['id'];
      });

      this.httpService.get('tasks/' + this.id).subscribe((res) => {
          this.data = res;
          this.owner = this.data.owner;
          //this.avatar = this.data.avatar;
          console.log(this.data);
      });
  }

}
