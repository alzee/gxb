import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import {Location} from '@angular/common';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-occupy',
  templateUrl: './occupy.page.html',
  styleUrls: ['./occupy.page.scss'],
})
export class OccupyPage implements OnInit {
  owner: string = '/api/users/4';
  days: number = 10;
  price: string = '1';
  land: string;
  cover: string;
  title: string = '';
  body: string;
  paid: boolean = false;
  url: string = environment.url;
  postData = {
  };

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private http: HttpClient,
      private router: Router,
      private _location: Location
  ) { }

  ngOnInit() {
      this.total = this.days * this.price;
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.land = '/api/lands/' + params['id'];
      });
      if(this.paid){
          console.log('ok');
          this.post();
      }
  }

  validateInputs() {
      this.postData.days = this.days;
      this.postData.price = this.price;
      this.postData.cover = this.cover;
      this.postData.title = this.title;
      this.postData.body = this.body;
      this.postData.owner = this.owner;
      this.postData.land = this.land;
  }

  publish() {
      this.validateInputs();
      this.httpService.post('land_posts', this.postData).subscribe((res) => {
          console.log(res);
          //this._location.back();
          this.router.navigate(['/land']);
      });
  }

  uploadPhoto(fileChangeEvent) {
    console.log(fileChangeEvent);
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];

    // Create a form data object using the FormData API
    let formData = new FormData();

    // Add the file that was just added to the form data
    formData.append("file", photo, photo.name);

    // POST formData to server using HttpClient
    const url = environment.apiUrl;
    let o:any; // = { contentUrl?: '' };
    this.http.post(url + 'media_objects', formData).subscribe((res) => {
      console.log(res);
      o = res
      this.cover = o.contentUrl;
    });
  }

}
