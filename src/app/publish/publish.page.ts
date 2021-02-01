import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  userData = {};
  category = '';
  platform = '';
  categories = [];
  platforms = [];
  postData = {
      owner: '',
      title: '',
      name: '',
      applydays: '',
      approvedays: '',
      prepaid: '',
      quantity: '',
      showdays: '',
      category: '',
      platform: ''
  };

  constructor(
      private httpService: HttpService,
      private storageService: StorageService,
      private router: Router
  ) {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.httpService.get('categories?itemsPerPage=50', this.postData).subscribe((res) => {
          console.log(res);
          this.categories = res;
      });
      this.httpService.get('platforms?itemsPerPage=50', this.postData).subscribe((res) => {
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
      this.postData.applydays = parseInt(this.postData.applydays, 10);
      this.postData.category = '/api/categories/' + this.category;
      this.postData.platform = '/api/platforms/' + this.platform;
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
}
