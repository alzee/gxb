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
          this.post = res;
      });
  }

  ionViewWillEnter() {
      this.httpService.get(`reads?user=${this.userData.id}&post=${this.pid}`).subscribe((res) => {
          if (res.length === 0) {
              // count 5 sec
              let timeout = setTimeout(() => {
                  this.getCoin();
              }, 5000);
          }
      });
  }

  getCoin() {
      let postData = {
          user: '/api/users/' + this.userData.id,
          post: '/api/land_posts/' + this.pid
      };

      this.httpService.post('reads', postData).subscribe((res) => {
      });

      postData = {
          amount: 1,
          user: '/api/users/' + this.userData.id,
          type: 1
      };

      this.httpService.post('coins', postData).subscribe((res) => {
          this.toastService.presentToast('阅读5秒金币+1');
      });
  }
}
