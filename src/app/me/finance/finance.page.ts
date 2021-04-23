import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  seg = 0;
  userData: Data;
  month: string;
  hists = [];

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    const d = new Date();
    this.month = d.getFullYear() + '-' + (d.getMonth() + 1);
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then(
      (res) => {
        this.userData = res;
        this.httpService.get('finances?page=1&itemsPerPage=30&order%5Bdate%5D=desc&user=' + this.userData.id).subscribe((res1) => {
          this.hists = res1;
        });
      });
  }

  showMonth() {
    console.log(this.month);
  }

  segmentChanged(ev: any) {
    this.seg = ev.detail.value;
    console.log('Segment changed', this.seg);
  }
}
