import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { DateLeftPipe } from '../date-left.pipe';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  subscription: Subscription;
  message: Data;
  id: number;
  userData: Data;
  task: Data;
  applied: boolean;
  myApply: Data;
  envs = environment;
  statusId = 0;
  applyId: number;
  workDeadline: number;
  approveDeadline: number;
  workTime: string;
  reviewTime: string;
  note = '' ;
  pics = [];
  uploads = [];

  constructor(
      private clipboard: Clipboard,
      public alertController: AlertController,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private http: HttpClient,
      private storageService: StorageService,
      private router: Router,
      private toastService: ToastService,
      private data: DataService
  ) {
      this.applied = false;
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });
  }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      console.log(this.message);

      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = parseInt(params.id, 10);
          if (this.id === 0) {  // 0 means it's a preview
              this.task = this.message.postData;
              this.task.id = this.id;
          }
      });

      if (this.id === 0) {
          return;
      }

      this.httpService.get('tasks/' + this.id).subscribe((res) => {
          this.task = res;
          if (this.task.workHours > 24) {
              this.workTime = this.task.workHours / 24 + ' 天';
          }
          else {
              this.workTime = this.task.workHours + ' 小时';
          }
          if (this.task.reviewHours > 24) {
              this.reviewTime = this.task.reviewHours / 24 + ' 天';
          }
          else {
              this.reviewTime = this.task.reviewHours + ' 小时';
          }
          for (const i of this.task.applies){
              if (i.applicant.id === this.userData.id){
                  this.applied = true;
                  this.statusId = i.status.id;
                  this.applyId = i.id;
                  this.pics = i.pic;
                  this.myApply = i;
                  break;
              }
          }
          switch (this.statusId) {
              case 0:
                  break;
              case 11:
                  const applyDate = new Date(this.myApply.date);
                  this.workDeadline = applyDate.setHours(applyDate.getHours() + this.task.workHours);
                  break;
              case 12:
                  const submitAt = new Date(this.myApply.submitAt);
                  this.approveDeadline = submitAt.setHours(submitAt.getHours() + this.task.reviewHours);
                  console.log(typeof this.approveDeadline, this.approveDeadline);
                  break;
          }
      });
  }

  apply() {
      this.httpService.get('tasks/' + this.id).subscribe((res) => {
          this.task = res;
          if (this.task.remain <= 0) {
              this.toastService.presentToast('任务已经抢完啦！');
          }
          else {
              const postData = {
                  task: '/api/tasks/' + this.id,
                  applicant: '/api/users/' + this.userData.id,
                  status: '/api/statuses/11'
              };
              this.httpService.post('applies', postData).subscribe((res1) => {
                  this.toastService.presentToast('申请成功');
                  this.router.navigate(['/mytasks'], {replaceUrl: true});
              });
          }
      });

  }

  async submit() {
    const alert = await this.alertController.create({
      header: '提交后无法修改',
      message: '确认提交么？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
            const postData = {
              status: '/api/statuses/12',
              note: this.note,
              pic: this.uploads
            };
            console.log(this.note);
            this.httpService.patch('applies/' + this.applyId, postData).subscribe((res) => {
              console.log(res);
              this.toastService.presentToast('已提交');
              this.ngOnInit();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  uploadPhoto(fileChangeEvent, i) {
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
    const that = this;
    this.http.post(url + 'media_objects', formData).subscribe((res) => {
      console.log(res);
      o = res;
      // this.uploads.push(o.contentUrl);
      this.uploads[i] = o.contentUrl;
      console.log(this.uploads);
    });
  }

  report(){
      // check if already reported
      this.httpService.get('reports?apply=' + this.applyId).subscribe((res) => {
          if (res.length > 0) {
              this.router.navigate(['/report/my']);
          }
          else {
              this.message = {
                  apply: this.myApply,
                  task: this.task
              };
              this.data.changeMessage(this.message);
              this.router.navigate(['/report'], { replaceUrl: true });
          }
      });
  }

  copy(){
      this.clipboard.copy(this.task.link);
      this.toastService.presentToast('链接已复制');
  }
}
