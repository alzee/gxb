import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  position: number;
  myposts: Data;
  bids: Data;
  myBid: number;
  post: number;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.position = params['id'];
      });
      this.httpService.get('tasks?order%5Bdate%5D=desc').subscribe((res) => {
        console.log(res);
        this.myposts = res;
      });
      this.httpService.get('bids?page=1&itemsPerPage=10&position=' + this.id).subscribe((res) => {
        console.log(res);
        this.bids = res;
      });
  }

  bid(){
    console.log(this.myBid);
    console.log(this.post);
    console.log(this.position);
  }

}
