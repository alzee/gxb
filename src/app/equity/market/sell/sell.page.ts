import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  form: FormGroup;
  message: Data;
  price: number;
  max: number;

  constructor(
      public navCtrl: NavController,
      private toastService: ToastService,
      private httpService: HttpService,
      private formBuilder: FormBuilder,
      private data: DataService
  ) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      console.log(this.message);
      this.price = this.message.price;
      this.max = this.message.equity - 1;

      this.form = this.formBuilder.group({
          equity: [, [Validators.min(0), Validators.max(this.max), Validators.min(1)]],
      });
  }

  get equity(){
      return this.form.controls.equity;
  }

  publish(){
      const postData = {
          seller: this.message.user,
          equity: this.equity.value,
          rmb: this.message.price * this.equity.value * 100
      };
      this.httpService.post('equity_trades', postData).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('发售成功');
          this.navCtrl.back();
      });
  }

}
