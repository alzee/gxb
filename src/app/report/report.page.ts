import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  subscription: Subscription;
  message: Data;
  apply: Data;
  desc: string;
  pics = [];
  url: string = environment.url;

  constructor(
      private toastService: ToastService,
      public navCtrl: NavController,
      private httpService: HttpService,
      private http: HttpClient,
      private data: DataService
  ) { }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
      this.apply = this.message.apply;
      console.log(this.apply);
  }

  submit(){
    console.log(this.desc);
    const postData = {
      apply: '/api/applies/' + this.apply.id,
      descA: this.desc,
      picsA: this.pics,
    };
    this.httpService.post('reports', postData).subscribe((res) => {
      this.toastService.presentToast('维权已提交');
      this.navCtrl.back();
      // console.log(res);
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
