import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.page.html',
  styleUrls: ['./cell.page.scss'],
})
export class CellPage implements OnInit {
  url = environment.url;
  pid: number;
  post: Data;
  userData: Data;
  timeout: number;

  constructor(
      private toastService: ToastService,
      private activeRoute: ActivatedRoute,
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          });

      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.pid = params.id;
      });

      this.httpService.get('land_posts/' + this.pid).subscribe((res) => {
          console.log(res);
          this.post = res;
      });
  }

  ionViewWillEnter() {
      this.httpService.get(`reads?user=${this.userData.id}&post=${this.pid}`).subscribe((res) => {
          if (res.length === 0) {
              // count 5 sec
              this.timeout = setTimeout(() => {
                  this.getCoin();
              }, 5000);
          }
      });
  }

  ionViewWillLeave() {
      clearTimeout(this.timeout);
  }

  getCoin() {
      const postData = {
          user: '/api/users/' + this.userData.id,
          post: '/api/land_posts/' + this.pid
      };

      this.httpService.post('reads', postData).subscribe((res) => {
          this.toastService.presentToast('阅读5秒金币+1');
      });
  }
}
