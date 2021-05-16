import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastService } from '../../services/toast.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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
  fileTransfer: FileTransferObject;

  constructor(
      private androidPermissions: AndroidPermissions,
      private clipboard: Clipboard,
      private toastService: ToastService,
      private transfer: FileTransfer,
      private file: File,
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
    this.fileTransfer = this.transfer.create();
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

  download(i){
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then((data: any) => {
          if (data.hasPermission) {
              console.log('have permission');
              const url = this.env.imgUrl + 'poster/' + this.userData.username + '_' + i;
              this.fileTransfer.download(url, this.file.externalRootDirectory + 'Download/' + i).then((entry) => {
                  console.log('download complete: ' + entry.toURL());
                  this.toastService.presentToast('已保存至下载文件夹');
              }, (error) => {
                  this.toastService.presentToast('下载失败');
                  // handle error
              });
          }
      });
  }

  copy(){
      this.clipboard.copy(this.code);
      this.toastService.presentToast('邀请码已复制');
  }
}
