import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

interface Data {
    [propName: string]: any;
}

interface UserData {
    [propName: string]: any;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: number;
  userData: UserData;
  data: Data;
  applyData: object;
  applied: boolean;
  envs = environment;
  status: number;
  applyId: number;
  pics = [];
  uploads = [];

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private http: HttpClient,
      private storageService: StorageService,
      private router: Router,
      private toastService: ToastService
  ) {
      this.applied = false;
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params.id;
      });

      this.httpService.get('tasks/' + this.id).subscribe((res) => {
          this.data = res;
          console.log(this.data);
          console.log(this.data.applies);
          for (const i of this.data.applies){
              if (i.applicant.id === this.userData.id){
                  this.applied = true;
                  this.status = i.status.id;
                  this.applyId = i.id;
                  this.pics = i.pic;
                  break;
              }
              console.log(i.applicant.id);
              // console.log(this.userData.id);
          }
      });
  }

  apply() {
      const data = {
          task: '/api/tasks/' + this.id,
          applicant: '/api/users/' + this.userData.id,
          status: '/api/statuses/1'
      };
      this.httpService.post('applies', data).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('申请成功');
          this.router.navigate(['/mytasks'], {replaceUrl: true});
      });
  }

  submit() {
      const data = {
          status: '/api/statuses/2',
          pic: this.uploads
      };
      this.httpService.patch('applies/' + this.applyId, data).subscribe((res) => {
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
}


