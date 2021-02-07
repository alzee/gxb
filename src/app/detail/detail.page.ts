import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

interface Data {
    //owner: object;
    //applies: any[];
    //id?: any;
    //title: string;
    [propName: string]: any;
}

interface UserData {
    //id: number;
    [propName: string]: any;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string;
  userData: UserData; 
  data: Data;
  applyData: object;
  applied: boolean = false;
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
          console.log(this.data);
          console.log(this.data.applies);
          for ( let i = 0; i < this.data.applies.length; i++){
              if(this.data.applies[i].applicant.id === this.userData.id){
                  this.applied = true;
                  break;
              };
              console.log(this.data.applies[i].applicant.id);
              //console.log(this.userData.id);
          }
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


