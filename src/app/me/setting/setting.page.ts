import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Wechat } from '@ionic-native/wechat/ngx';
import { DataService } from '../../services/data.service';

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
  version: string;
  url = environment.url;
  user: Data;
  updateUrl = this.env.updateUrl;
  ver: string;
  authCode: Data;
  wxuserinfo: Data;
  message: Data;

  constructor(
        private appVersion: AppVersion,
        private data: DataService,
        private wechat: Wechat,
        public alertController: AlertController,
        private platform: Platform,
        private authService: AuthService,
        private httpService: HttpService,
        private http: HttpClient,
        private toastService: ToastService,
        private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      this.user = this.message.user;

      this.appVersion.getVersionNumber().then(
        (res) => {
          this.ver = res;
        }
      );
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
                  // this.toastService.presentToast(`${res.version} ${res.ready} ${res.size} ${res.chunks}`);
                  if (res.version === this.ver) {
                      this.toastService.presentToast('已经是最新哦！');
                  }
                  else {
                      if (res.ready) {
                          this.installUpdate();
                      }
                      else {
                          this.toastService.presentToast('后台更新中...');
                          cordova.plugins.apkupdater.download().then(
                              (res1) => {
                                  console.log('download done:', res1);
                                  this.installUpdate();
                              }, (reason1) => {
                                  console.log('download failed:', reason1);
                              }
                          );
                      }
                  }
              }, (reason) => {
                  console.log('check failed:', reason);
                  this.toastService.presentToast('更新失败');
              }
          );
      });
  }

  installUpdate() {
      cordova.plugins.apkupdater.install().then(
          (res2) => {
              console.log('install done:', res2);
          }, (reason2) => {
              console.log('install failed:', reason2);
          }
      );
  }

  auth() {
      /*
      const r = {
          code: '0012XfGa19hM3B0L5kHa1WAm8A22XfGk',
          uid: this.user.id
      };
      this.httpService.post('wxauth', r).subscribe((res1) => {
          console.log(res1);
          this.wxuserinfo = res1;
          this.user.avatar = '/media/avatar/' + this.user.id + '.jpg'
      });
      */

      const scope = 'snsapi_userinfo';
      const state = '_' + (+new Date());
      this.wechat.auth(scope, state).then((res) => {
          this.authCode = res;
          console.log('========Begin===========');
          console.log('code is:', this.authCode.code);
          console.log('errCode is:', this.authCode.ErrCode);
          console.log('state is:', this.authCode.state);
          console.log('lang is:', this.authCode.lang);
          console.log('conntry is:', this.authCode.country);
          console.log('========End===========');
          const postData = {
              code: this.authCode.code,
              uid: this.user.id
          };
          this.httpService.post('wxauth', postData).subscribe((res1) => {
              console.log('wxuserinfo: ', res1);
              this.wxuserinfo = res1;
              console.log('========Begin===========');
              console.log('img is:', this.wxuserinfo.headimgurl);
              console.log('nick is:', this.wxuserinfo.nickname);
              console.log('openid is:', this.wxuserinfo.openid);
              console.log('unionid is:', this.wxuserinfo.unionid);
              console.log('========End===========');
              this.user.avatar = '/media/avatar/' + this.user.id + '.jpg';
          });
      }, reason => {
          console.log('failed: ', reason);
      });
  }
}
