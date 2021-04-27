import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  env = environment;
  code: string;
  picUrl: string;
  posters = [
    'refer_poster0.jpg',
    'refer_poster1.jpg',
    'refer_poster2.jpg',
  ];
  userData: Data;
  user: Data;
  slideOpts = {
      slidesPerView: 1,
      // loop: true,
      // height: 40
  };

  constructor(
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
      console.log(res);
      this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
        console.log(res1);
        this.user = res1;
        this.code = this.user.refcode;
      });
    });
  }

  changeSlide(e){
    console.log(e);
  }
}
