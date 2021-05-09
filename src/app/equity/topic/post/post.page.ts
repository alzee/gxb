import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { AuthConstants } from '../../../config/auth-constants';
import { StorageService } from '../../../services/storage.service';
import { NavController } from '@ionic/angular';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  form: FormGroup;
  userData: Data;
  user: Data;

  constructor(
      public navCtrl: NavController,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });

      this.form = this.formBuilder.group({
          title: [],
          body: [],
      });
  }

  get f(){
      return this.form.controls;
  }

  post() {
      const postData = {
          author: '/api/users/' + this.userData.id,
          title: this.f.title.value,
          body: this.f.body.value,
          type: '/api/node_types/2'
      };
      this.httpService.post('nodes', postData).subscribe((res) => {
          console.log(res);
          this.navCtrl.back();
      });
  }
}
