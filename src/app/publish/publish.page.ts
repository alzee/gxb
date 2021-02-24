import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  userData = {
      id: 0
  };
  applydays = '';
  category = '';
  platform = '';
  categories = [];
  platforms = [];
  guide = {
      desc: '',
      img: ''
  };
  postData = {
      owner: '',
      title: '',
      name: '',
      applydays: 0,
      approvedays: 0,
      prepaid: '',
      quantity: 0,
      showdays: 0,
      category: '',
      platform: '',
      guides: []
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
  }

  postTask() {
      this.validateInputs();
      this.httpService.post('tasks', this.postData).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/myposts']);
      });
  }

  validateInputs() {
      this.postData.owner = 'api/users/' + this.userData.id;
      this.postData.applydays = parseInt(this.applydays, 10);
      this.postData.category = '/api/categories/' + this.category;
      this.postData.platform = '/api/platforms/' + this.platform;
      this.postData.guides.push(this.guide);
      let title = this.postData.title.trim();
      let name = this.postData.name.trim();
      let applydays = this.postData.applydays;
      let approvedays = this.postData.approvedays;
      let prepaid = this.postData.prepaid;
      let quantity = this.postData.quantity;
      let showdays = this.postData.showdays;
      //return (
      //    this.postData.username &&
      //        this.postData.password &&
      //        username.length > 0 &&
      //        password.length > 0
      //);
  }
  /*
{"title":"1","name":"1","applydays":1,"approvedays":1,"prepaid":1,"quantity":1,"showdays":1,"category":"/api/categories/1","price":1,"description":"1", "sticky": true, "recommended": true, "owner":"/api/users/4", "platform": "/api/platforms/1"}
   
   */

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
    // const o = {};
    // o.object = {
    //         desc: 'desc 3',
    //         pic: 'pic 3',
    //     };
    this.http.post(url + 'media_objects', formData).subscribe((res) => {
      console.log(res);
      this.guide.img = res.contentUrl;
    });
  }
}
