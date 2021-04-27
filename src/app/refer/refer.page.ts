import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {
  friends = [];
  count: number;
  userData = {
      id: 0
  };

  constructor(
      private httpService: HttpService,
      private storageService: StorageService
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users?page=1&itemsPerPage=1000&referrer=' + this.userData.id).subscribe((res1) => {
              this.friends = res1;
              this.count = this.friends.length;
          });
      });
  }

}
