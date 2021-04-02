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
  form: FormGroup;
  arr1 = [1];
  arr2 = [1];
  url = environment.url;
  min: number;
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
          time: 120,
          label: '5天'
      },
      {
          time: 168,
          label: '7天'
      }
  ];
  categories = [];
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
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private http: HttpClient,
      private storageService: StorageService,
      private router: Router
  ) {
  }

  ngOnInit() {
      this.min = 1;
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.httpService.get('categories?itemsPerPage=50').subscribe((res) => {
          console.log(res);
          this.categories = res;
      });
      this.form = this.formBuilder.group({
          category: [''],
          title: [''],
          name: [''],
          quantity: [''],
          applyHours: [''],
          approveHours: [''],
          showdays: [''],
          price: [, Validators.min(this.min)],
          description: [''],
          link: [''],
          note: [''],
          //guides: [[ {desc: '', img} ]],
          //reviews: [[ {desc: '', img} ]],
          acceptTerms: [false, Validators.requiredTrue],
      });
  }

  get f(){
      return this.form.controls;
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
      applyUntil.setHours(applyUntil.getHours() + this.f.applyHours.value);
      let approveUntil = new Date();
      approveUntil.setHours(approveUntil.getHours() + this.f.approveHours.value);
      this.postData.owner = 'api/users/' + this.userData.id;
      this.postData.category = '/api/categories/' + this.f.category.value;
      this.postData.title = this.f.title.value;
      this.postData.name = this.f.name.value;
      this.postData.quantity = this.f.quantity.value;
      this.postData.applyUntil = applyUntil;
      this.postData.approveUntil = approveUntil;
      this.postData.showdays = this.f.showdays.value;
      this.postData.price = this.f.price.value;
      this.postData.description = this.f.description.value;
      this.postData.link = this.f.link.value;
      this.postData.note = this.f.note.value;
      this.postData.guides.push(this.guides);
      this.postData.reviews.push(this.reviews);
      //return (
      //    this.postData.username &&
      //        this.postData.password &&
      //        username.length > 0 &&
      //        password.length > 0
      //);
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
      console.log(this.f);
      console.log(this.postData);
      console.log(this.guides[0].img);
      console.log(this.reviews[0].img);
  }

  getCateMin(){
      let that = this;
      this.categories.forEach(
          function(i){
              if(i.id == that.f.category.value){
                  that.min = i.rate;
                  console.log(that.min);
                  return;
              }
          }
      )
  }
}
