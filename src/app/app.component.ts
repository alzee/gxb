import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './services/http.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { environment } from '../environments/environment';
import { ToastService } from './services/toast.service';

interface Data {
    [propName: string]: any;
}

declare var cordova;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  env = environment;
  conf: Data;
  ver: string;
  updateUrl = this.env.updateUrl;
  check: Data;
  constructor(
    private platform: Platform,
    private appVersion: AppVersion,
    public alertController: AlertController,
    private splashScreen: SplashScreen,
    private httpService: HttpService,
    private toastService: ToastService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.httpService.get('confs/1').subscribe((res) => {
          this.conf = res;
          if (this.conf.forceUpdate) {
              this.appVersion.getVersionNumber().then(
                  (res) => {
                      this.ver = res;
                  }
              );

              cordova.plugins.apkupdater.check(this.updateUrl).then(
                  (res) => {
                      this.check = res;
                      if (res.version !== this.ver) {
                          this.alert();
                      }
                  }
              );
          }
      });
    });
  }

  async alert() {
      const alert = await this.alertController.create({
          header: '更新至最新版',
          message: '请更新至最新版',
          backdropDismiss: false,
          buttons: [
              {
                  text: '取消',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                      console.log('Confirm Cancel: blah');
                      navigator['app'].exitApp();
                  }
              }, {
                  text: '确定',
                  handler: () => {
                      console.log('Confirm Okay');
                      this.update();
                  }
              }
          ]
      });

      await alert.present();
  }

  update() {
      cordova.plugins.apkupdater.check(this.updateUrl).then(
          (res) => {
              if (this.check.ready) {
                  cordova.plugins.apkupdater.install().then(
                      (res2) => {
                          console.log('install done:', res2);
                      }, (reason2) => {
                          console.log('install failed:', reason2);
                      }
                  );
              }
              else {
                  // show process
                  this.toastService.presentToast('后台更新中...');
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
              }
          }
      );
  }
}
