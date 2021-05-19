import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  id: number;
  node: Data;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.id = parseInt(params.id, 10);
      this.httpService.get('nodes/' + this.id).subscribe((res) => {
        this.node = res;
      });
    });
}

}
