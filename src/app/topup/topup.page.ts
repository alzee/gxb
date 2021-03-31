import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {
  amount: number;

  constructor() { }

  ngOnInit() {
  }

  topup(){
    console.log(this.amount);
  }

}
