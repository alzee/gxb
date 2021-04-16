import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-occupy',
  templateUrl: './occupy.page.html',
  styleUrls: ['./occupy.page.scss'],
})
export class OccupyPage implements OnInit {
  form: FormGroup;
  daysMin = 10;
  priceMin = 1;
  price = 0;
  amount: number;
  landId: number;
  cover: string;
  pics = [];
  url: string = environment.url;
  postData: Data = {};
  userData: Data;
  message: Data;
  orderType = 6;
  orderNote = '占领格子';

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private http: HttpClient,
      private router: Router,
      private data: DataService
  ) {
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
        (res) => {
          this.userData = res;
        });

      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.landId = parseInt(params.id, 10);
          if (this.landId !== 1) {
            this.daysMin = 20;
            this.priceMin = 0.5;
          }
      });

      this.form = this.formBuilder.group({
          body: [],
          days: ['', Validators.min(this.daysMin)],
          price: ['', Validators.min(this.priceMin)],
      });
  }

  get f(){
      return this.form.controls;
  }

  validateInputs() {
      this.postData.body = this.f.body.value;
      this.postData.days = this.f.days.value;
      this.postData.price = this.price;
      this.postData.cover = this.cover;
      this.postData.pics = this.pics;
      this.postData.owner = '/api/users/' + this.userData.id;
      this.postData.land = '/api/lands/' + this.landId;
  }

  publish() {
      this.validateInputs();

      const postData = this.postData;
      const orderData = {
        type: this.orderType,
        note: this.orderNote,
        amount: this.amount
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

  total(){
      // Number() or +, that is a question
      if (this.f.price.value) {
          this.price = Number(this.f.price.value.toFixed(2));    // only 2 digits after decimal
      }
      this.amount = +(this.f.days.value * this.price).toFixed(2);
  }
}
