import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  data = {};
  applyData = {};
  owner = {};
  //avatar = {};
  envs = environment;

  constructor(
      private activeRoute: ActivatedRoute,
      private httpService: HttpService,
      private storageService: StorageService,
      private router: Router,
      private toastService: ToastService
  ) {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
      });
  }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.id = params['id'];
      });

      this.httpService.get('tasks/' + this.id).subscribe((res) => {
          this.data = res;
          this.owner = this.data.owner;
          //this.avatar = this.data.avatar;
          console.log(this.data);
      });
  }

  apply() {
      let data = {
          task: "/api/tasks/" + this.id,
          applicant: "/api/users/" + this.userData.id,
          status: "/api/statuses/1"
      };
      this.httpService.post('applies', data).subscribe((res) => {
          console.log(res);
          this.toastService.presentToast('申请成功');
          this.router.navigate(['/mytasks']);
      });
  }

}
