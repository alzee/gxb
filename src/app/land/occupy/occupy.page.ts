import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import {Location} from '@angular/common';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-occupy',
  templateUrl: './occupy.page.html',
  styleUrls: ['./occupy.page.scss'],
})
export class OccupyPage implements OnInit {
  owner: string;
  days: number;
  price: number;
  land: string;
  landId: number;
  cover: string;
  pics = [];
  title: string;
  body: string;
  paid: string;
  url: string = environment.url;
  postData: Data = {};
  subscription: Subscription;
  message: Data;
  orderType = 2;
  orderNote = '占领格子';

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private http: HttpClient,
      private router: Router,
      private location: Location,
      private data: DataService
  ) {
      this.owner = '/api/users/4';
      this.days = 10;
      this.price = 1;
  }

  ngOnInit() {
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message);

      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.landId = params.id;
          this.land = '/api/lands/' + this.landId;
          if (this.landId !== 1) {
            this.days = 20;
            this.price = 0.05;
          }
      });
  }

  // ionViewWillEnter(){
  ionViewDidEnter(){
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.paid = params.paid;
          if (this.paid === 'y'){
              console.log(typeof this.paid);
              // this.publish();
          }
      });
  }

  validateInputs() {
      this.postData.days = this.days;
      this.postData.price = this.price * 100;
      this.postData.cover = this.cover;
      this.postData.pics = this.pics;
      this.postData.title = this.title;
      this.postData.body = this.body;
      this.postData.owner = this.owner;
      this.postData.land = this.land;
  }

  publish() {
      this.validateInputs();

      const postData = this.postData;
      const orderData = {
        type: this.orderType,
        note: this.orderNote,
        amount: this.price * this.days,
      };
      this.message = {
          orderData,
          postData,
          url: 'land_posts',
          httpMethod: 'post'
      };
      this.data.changeMessage(this.message);
      this.router.navigate(['/pay'], { replaceUrl: true });
  }

  uploadPhoto(fileChangeEvent, type) {
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
      if (type === 'cover') {
          this.cover = o.contentUrl;
      }
      if (type === 'pic') {
          this.pics.push(o.contentUrl);
      }
      console.log(this.pics);
      console.log(this.cover);
    });
  }
}
