import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  backButtonSubscription;
  private activeTab?: HTMLElement;

  constructor(
    private platform: Platform,
    private appMinimize: AppMinimize,
  ) {
  }

  tabChange(tabsRef: IonTabs) {
    this.activeTab = tabsRef.outlet.activatedView.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
    console.log('leave tabs');
    this.backButtonSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(-1, () => {
        this.appMinimize.minimize();
    });
  }

  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

}
