import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

interface Data {
    [propName: string]: any;
}

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
  message: Data;
  land: Data;

  constructor(
      public navCtrl: NavController,
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private toastService: ToastService,
      private data: DataService
  ) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      this.land = this.message.land;
      console.log(this.land);
      this.id = this.land.id;
      this.name = this.land.name;
      this.prePrice = parseInt(this.land.prePrice, 10);
      this.plist = [
        Math.round(this.prePrice * 0.7),
        Math.round(this.prePrice * 0.8),
        Math.round(this.prePrice * 0.9),
        this.prePrice,
        Math.round(this.prePrice * 1.1),
        Math.round(this.prePrice * 1.2),
        Math.round(this.prePrice * 1.3),
      ];
  }

  changePrice(){
    console.log(this.newPrice);
    const data = {
      price: +this.newPrice
    };
    this.httpService.patch('lands/' + this.id, data).subscribe((res) => {
      console.log(res);
      this.navCtrl.back();
    });
  }
}
