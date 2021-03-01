import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.page.html',
  styleUrls: ['./cell.page.scss'],
})
export class CellPage implements OnInit {
  url = environment.url;
  id: number;
  data: Data;
  user: string;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params['id'];
      });

      this.httpService.get('land_posts/' + this.id).subscribe((res) => {
          this.data = res;
          console.log(this.data);
      });
  }

}
