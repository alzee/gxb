import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  id: number;
  userData: Data;
  env = environment;
  report: Data;
  apply: Data;
  isApplicant: boolean;
  desc: string;
  pics = [];

  constructor(
    private toastService: ToastService,
    private storageService: StorageService,
    private httpService: HttpService,
    private http: HttpClient,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData = res;
    });

    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.id = params.id;
      this.httpService.get('reports/' + this.id).subscribe((res) => {
          this.report = res;
          this.apply = this.report.apply;
          if (this.apply.applicant.id === this.userData.id) {
            this.isApplicant = true;
          }
          else {
            this.isApplicant = false;
          }
          console.log(res);
      });
    });
  }

  submit(){
    console.log(this.desc);
    const postData = {
      descB: this.desc,
      picsB: this.pics,
    };
    this.httpService.patch('reports/' + this.id, postData).subscribe((res) => {
      this.toastService.presentToast('辩诉已提交');
      this.ngOnInit();
    });
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
      this.pics.push(o.contentUrl);
      console.log(this.pics);
    });
  }
}
