import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  arr1 = [1];
  arr2 = [1];
  url = environment.url;
  userData = {
      id: 0
  };
  hourOptions = [
      {
          time: 3,
          label: '3小时'
      },
      {
          time: 6,
          label: '6小时'
      },
      {
          time: 24,
          label: '1天'
      },
      {
          time: 72,
          label: '3天'
      },
      {
          time: 125,
          label: '5天'
      },
      {
          time: 175,
          label: '7天'
      }
  ];
  applyHours: number;
  approveHours: number;
  countGuides = 3;
  countReviews = 3;
  category = '';
  platform = '';
  categories = [];
  platforms = [];
  guides = [
      {
          desc: '',
          img: ''
      }
  ];
  reviews = [
      {
          desc: '',
          img: ''
      }
  ];
  guide = {
      desc: '',
      img: ''
  };
  review = {
      desc: '',
      img: ''
  };
  postData: Data = {
      //owner: '',
      //title: '',
      //name: '',
      //applyHours: 0,
      //approveHours: 0,
      //quantity: 0,
      //showdays: 0,
      //category: '',
      //platform: '',
      guides: [],
      reviews: []
  };

  constructor(
      private httpService: HttpService,
      private http: HttpClient,
      private storageService: StorageService,
      private router: Router
  ) {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.httpService.get('categories?itemsPerPage=50').subscribe((res) => {
          console.log(res);
          this.categories = res;
      });
      this.httpService.get('platforms?itemsPerPage=50').subscribe((res) => {
          console.log(res);
          this.platforms = res;
      });
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
          },
          (rej) => {
              this.router.navigate(['/signin']);
          }
      )
  }

  postTask() {
      this.validateInputs();
      this.httpService.post('tasks', this.postData).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/myposts']);
      });
  }

  validateInputs() {
      let applyUntil = new Date();
      applyUntil.setHours(applyUntil.getHours() + parseInt(this.applyHours));
      let approveUntil = new Date();
      approveUntil.setHours(approveUntil.getHours() + parseInt(this.approveHours));
      /*
      this.postData.owner = 'api/users/' + this.userData.id;
      this.postData.applyHours = parseInt(this.applyHours, 10);
      this.postData.category = '/api/categories/' + this.category;
      this.postData.platform = '/api/platforms/' + this.platform;
      this.postData.guides.push(this.guides);
      this.postData.reviews.push(this.reviews);
      let title = this.postData.title.trim();
      let name = this.postData.name.trim();
      let applyHours = this.postData.applyHours;
      let approveHours = this.postData.approveHours;
      let quantity = this.postData.quantity;
      let showdays = this.postData.showdays;
      //return (
      //    this.postData.username &&
      //        this.postData.password &&
      //        username.length > 0 &&
      //        password.length > 0
      //);
      */
  }

  uploadPhoto(fileChangeEvent, type, i) {
    //console.log(fileChangeEvent);
    console.log(type);
    console.log(i);
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

      if(type == 'guide')
          this.guides[i].img = o.contentUrl;
      if(type == 'review')
          this.reviews[i].img = o.contentUrl;
    });
  }

  add1(){
      this.guides.push(
          {
              desc: '',
              img: ''
          }
      );
      this.arr1.push(1);
  }

  add2(){
      this.reviews.push(
          {
              desc: '',
              img: ''
          }
      );
      this.arr2.push(1);
  }

  preview(){
      this.validateInputs();
  }
}
