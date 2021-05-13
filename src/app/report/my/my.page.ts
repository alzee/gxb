import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
  envs = environment;
  myReports = [];
  reportsAboutMe = [];
  reports = [];
  userData: Data;
  seg = 1;

  constructor(
    private storageService: StorageService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
      this.httpService.get('reports?apply.applicant=' + this.userData.id).subscribe((res1) => {
        console.log(res1);
        this.myReports = res1;
        this.reports = this.myReports;
      });
      this.httpService.get('reports?apply.task.owner=' + this.userData.id).subscribe((res2) => {
        console.log(res2);
        this.reportsAboutMe = res2;
      });
    });
  }

  segmentChanged(e){
      this.seg = +e.detail.value;
      console.log(this.seg);
      switch (this.seg) {
          case 1:
              this.reports = this.myReports;
              break;
          case 2:
              this.reports = this.reportsAboutMe;
              break;
      }
  }
}
