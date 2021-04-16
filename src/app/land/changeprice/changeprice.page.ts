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
          this.name = params.name;
          console.log(this.id);
      });
  }

  changePrice(){
    console.log(this.newPrice);
    const data = {
      price: this.newPrice * 100,
      forSale: true
    };
    this.httpService.patch('lands/' + this.id, data).subscribe((res) => {
      console.log(res);
      this.navCtrl.back();
    });
  }
}
