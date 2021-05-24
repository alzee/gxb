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
  page = 1;
  query = 'itemsPerPage=15&order%5Bdate%5D=desc&status=5';
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
        this.getFinances();
      });
  }

  showMonth() {
    console.log(this.month);
  }

  segmentChanged(ev: any) {
    this.seg = ev.detail.value;
    console.log('Segment changed', this.seg);
  }

  getFinances() {
      this.httpService.get(`finances?page=${this.page}&${this.query}&user=${this.userData.id}`).subscribe((res) => {
          this.hists = [...this.hists, ...res];
      });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.page += 1;
      this.getFinances();
    }, 500);
  }
}
