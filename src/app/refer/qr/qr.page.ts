import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  code: string;
  picUrl = '../../../assets/img/qr0.png';
  userData: Data;
  user: Data;

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
      this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
        console.log(res1);
        this.user = res1;
        this.code = this.user.refcode;
      });
    });
  }

}
