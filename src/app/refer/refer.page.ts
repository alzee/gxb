import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastService } from '../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {
  count1: number;
  count2: number;
  node: Data;
  url = 'https://app.drgxb.com';
  userData = {
      id: 0
  };

  constructor(
      private clipboard: Clipboard,
      private toastService: ToastService,
      private httpService: HttpService,
      private storageService: StorageService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('refcount/' + this.userData.id).subscribe((res1) => {
              this.count1 = res1[0];
              this.count2 = res1[1];
          });
      });

      this.httpService.get('nodes/11').subscribe((res) => {
        this.node = res;
      });
  }

  copy(){
      this.clipboard.copy(this.url);
      this.toastService.presentToast('链接已复制');
  }
}
