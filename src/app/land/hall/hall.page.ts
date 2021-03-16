import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {
  url = environment.url;
  sales = [];

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.httpService.get('lands?page=1&itemsPerPage=5&forSale=true').subscribe((res) => {
          this.sales = res;
          console.log(res);
      });
  }

}
