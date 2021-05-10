import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ToastService } from '../../services/toast.service';

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
      const url = this.env.imgUrl + 'poster/' + this.userData.username + '_' + i;
      this.fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + i).then((entry) => {
          console.log('download complete: ' + entry.toURL());
          this.toastService.presentToast('已保存至<p>/storage/emulated/0/Download/</p>');
      }, (error) => {
          this.toastService.presentToast('下载失败');
          // handle error
      });
  }
}
