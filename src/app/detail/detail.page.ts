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
  workMinutesRemain: number;
  workMinutesRemainString: string;
  reviewMinutesRemain: number;
  reviewMinutesRemainString: string;
  minutesPast = 0;
  pics = [];
  uploads = [];

  constructor(
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
          this.id = params.id;
          if (this.id === 0) {
              this.task = this.message.postData;
              this.task.id = this.id;
              return;
          }
      });

      this.httpService.get('tasks/' + this.id).subscribe((res) => {
          this.task = res;
          for (const i of this.task.applies){
              if (i.applicant.id === this.userData.id){
                  this.applied = true;
                  this.statusId = i.status.id;
                  this.applyId = i.id;
                  console.log(this.applyId);
                  this.pics = i.pic;
                  this.minutesPast = Math.round((new Date().getTime() - new Date(i.date).getTime()) / 1000 / 60);
                  this.httpService.get('applies/' + i.id).subscribe((res1) => {
                      this.myApply = res1;
                      console.log(this.myApply);
                  });
                  break;
              }
          }
          switch (this.statusId) {
              case 0:
                  this.workMinutesRemain = this.task.workHours * 60;
                  this.reviewMinutesRemain = this.task.reviewHours * 60;
                  break;
              case 1:
                  this.workMinutesRemain = this.task.workHours * 60 - this.minutesPast;
                  this.reviewMinutesRemain = this.task.reviewHours * 60;
                  break;
              case 2:
                  this.workMinutesRemain = 0;
                  this.reviewMinutesRemain = this.task.reviewHours * 60 - this.minutesPast;
                  break;
              default:
                  this.workMinutesRemain = 0;
                  this.reviewMinutesRemain = 0;
          }

          if (this.workMinutesRemain < 60) {
              this.workMinutesRemainString = this.workMinutesRemain + 'm';
          }
          else if (this.workMinutesRemain < 1440) {
              this.workMinutesRemainString = Math.trunc(this.workMinutesRemain / 60) + 'h';
          }
          else {
              this.workMinutesRemainString = Math.trunc(this.workMinutesRemain / 1440) + 'd';
          }

          if (this.reviewMinutesRemain < 60) {
              this.reviewMinutesRemainString = this.reviewMinutesRemain + 'm';
          }
          else if (this.reviewMinutesRemain < 1440) {
              this.reviewMinutesRemainString = Math.trunc(this.reviewMinutesRemain / 60) + 'h';
          }
          else {
              this.reviewMinutesRemainString = Math.trunc(this.reviewMinutesRemain / 1440) + 'd';
          }
      });
  }

  apply() {
      const postData = {
          task: '/api/tasks/' + this.id,
          applicant: '/api/users/' + this.userData.id,
          status: '/api/statuses/11'
      };
      this.httpService.post('applies', postData).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('申请成功');
          this.router.navigate(['/mytasks'], {replaceUrl: true});
      });
  }

  submit() {
      const postData = {
          status: '/api/statuses/12',
          pic: this.uploads
      };
      this.httpService.patch('applies/' + this.applyId, postData).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('已提交');
          this.ngOnInit();
      });
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
                  apply: this.myApply
              };
              this.data.changeMessage(this.message);
              this.router.navigate(['/report'], { replaceUrl: true });
          }
      });
  }
}
