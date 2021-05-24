import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Wechat } from '@ionic-native/wechat/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgOtpInputModule],
  providers: [
    Wechat,
    StatusBar,
    SplashScreen,
    AppMinimize,
    HttpClientModule,
    Clipboard,
    AndroidPermissions,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
