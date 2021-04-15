import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';

interface Data {
    [propName: string]: any;
}

declare var cordova;

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  env = environment;
  url = environment.url;
  user: Data;
  id: number;
  updateUrl = this.env.updateUrl;

  constructor(
        public alertController: AlertController,
        private platform: Platform,
        private authService: AuthService,
        private httpService: HttpService,
        private http: HttpClient,
        private toastService: ToastService,
        private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params.id;
      });

      this.httpService.get('users/' + this.id).subscribe((res) => {
          this.user = res;
          this.user.total = this.user.balanceTask + this.user.balanceTopup;
          console.log(this.user);
      });
  }

  logout() {
    this.authService.logout();
  }

  uploadPhoto(fileChangeEvent) {
    console.log(fileChangeEvent);
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];

    // Create a form data object using the FormData API
    const formData = new FormData();

    // Add the file that was just added to the form data
    formData.append('file', photo, photo.name);

    // POST formData to server using HttpClient
    const url = environment.apiUrl;
    let o: any; // = { contentUrl?: '' };
    this.http.post(url + 'media_objects', formData).subscribe((res) => {
      console.log(res);
      o = res;
      this.user.avatar = o.contentUrl;
      this.httpService.patch('users/' + this.user.id, {avatar: this.user.avatar}).subscribe((res1) => {
      });
    });
  }

  checkUpdate(){
      console.log('checking update...');
      this.platform.ready().then(() => {
          cordova.plugins.apkupdater.check(this.updateUrl).then(
              (res) => {
                  console.log('check done:', res);
                  this.toastService.presentToast('后台下载中...');
                  cordova.plugins.apkupdater.download().then(
                      (res1) => {
                          console.log('download done:', res1);
                          cordova.plugins.apkupdater.install().then(
                              (res2) => {
                                  console.log('install done:', res2);
                              }, (reason2) => {
                                  console.log('install failed:', reason2);
                              }
                          );
                      }, (reason1) => {
                          console.log('download failed:', reason1);
                      }
                  );
              }, (reason) => {
                  console.log('check failed:', reason);
              }
          );
      });
  }
}
