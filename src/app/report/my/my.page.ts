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
  userData: Data;

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
      });
    });
  }

  show(){
      console.log('show ');
  }
}
