import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  picUrl: string;
  code: string;

  constructor() { }

  ngOnInit() {
    this.code = 'A888888';
    this.picUrl = '../../../assets/img/qr0.png';
  }

}
