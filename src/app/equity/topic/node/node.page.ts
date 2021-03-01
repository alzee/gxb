import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-node',
  templateUrl: './node.page.html',
  styleUrls: ['./node.page.scss'],
})
export class NodePage implements OnInit {
  node: Data;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params['id'];
      });

      this.httpService.get('nodes/' + this.id).subscribe((res) => {
          this.node = res;
          console.log(this.node);
      });
  }

}
