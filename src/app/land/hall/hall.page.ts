import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {
  hists = [];

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.httpService.get('land_trades?page=1').subscribe((res) => {
          this.hists = res;
          console.log(res);
      });
  }

}
