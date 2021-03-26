import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-changeprice',
  templateUrl: './changeprice.page.html',
  styleUrls: ['./changeprice.page.scss'],
})
export class ChangepricePage implements OnInit {
  price: number;
  id: number;
  name: string;
  newPrice: number;

  constructor(
      private httpService: HttpService,
      private activeRoute: ActivatedRoute,
      private toastService: ToastService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params['id'];
          this.price = parseInt(params['price']);
          this.name = params['name'];
          console.log(this.id);
      });
  }

  changePrice(){
    console.log(this.newPrice);
    let data = {
      "price": this.newPrice,
      "prePrice": this.price
    };
    this.httpService.patch('lands/' + this.id, data).subscribe((res) => {
      console.log(res);
      //this.toastService.presentToast('价格调整');
      this.ngOnInit();
    });
  }
}
