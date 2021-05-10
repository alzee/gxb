import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-node',
  templateUrl: './node.page.html',
  styleUrls: ['./node.page.scss'],
})
export class NodePage implements OnInit {
  node: Data;
  nid: number;
  userData: Data;
  voted = true;

  constructor(
      private activeRoute: ActivatedRoute,
      private storageService: StorageService,
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.nid = params.id;
      });

      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              this.userData = res;
              this.httpService.get(`votes?user=${this.userData.id}&node=${this.nid}`).subscribe((res1) => {
                  if (res1.length === 0) {
                      this.voted = false;
                  }
              });
          });

      this.httpService.get('nodes/' + this.nid).subscribe((res) => {
          this.node = res;
          console.log(this.node);
      });
  }

  vote(isUp: boolean) {
      const postData = {
          user: '/api/users/' + this.userData.id,
          node: '/api/nodes/' + this.nid,
          isUp
      };

      this.httpService.post('votes', postData).subscribe((res) => {
          console.log(res);
          this.voted = true;
      });
  }
}
