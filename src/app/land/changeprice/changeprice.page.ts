import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-changeprice',
  templateUrl: './changeprice.page.html',
  styleUrls: ['./changeprice.page.scss'],
})
export class ChangepricePage implements OnInit {
  prePrice: number;
  price: number;
  plist = [];
  id: number;
  name: string;
  newPrice: number;

  constructor(
      public navCtrl: NavController,
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private toastService: ToastService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params.id;
          this.prePrice = parseInt(params.prePrice, 10);
          this.plist = [
              Math.round(this.prePrice * 0.7),
              Math.round(this.prePrice * 0.8),
              Math.round(this.prePrice * 0.9),
              this.prePrice,
              Math.round(this.prePrice * 1.1),
              Math.round(this.prePrice * 1.2),
              Math.round(this.prePrice * 1.3),
          ];
          console.log(this.plist);
          this.name = params.name;
      });
  }

  changePrice(){
    console.log(this.newPrice);
    const data = {
      price: +this.newPrice,
      forSale: true
    };
    this.httpService.patch('lands/' + this.id, data).subscribe((res) => {
      console.log(res);
      this.navCtrl.back();
    });
  }
}
