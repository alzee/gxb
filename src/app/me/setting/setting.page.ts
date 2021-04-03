import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  url = environment.url;
  user: Data;
  id: number;

  constructor(
        private authService: AuthService,
        private httpService: HttpService,
        private http: HttpClient,
        private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params.id;
      });

      this.httpService.get('users/' + this.id).subscribe((res) => {
          this.user = res;
          this.user.total = this.user.balanceTask + this.user.balanceTopup;
          console.log(this.user);
      });
  }

  logout() {
    this.authService.logout();
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
      this.user.avatar = o.contentUrl;
      this.httpService.patch('users/' + this.user.id, {avatar: this.user.avatar}).subscribe((res1) => {
      });
    });
  }
}
