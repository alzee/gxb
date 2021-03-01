import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {
  posts: Data;

  constructor(
      private httpService: HttpService
  ) { }

  ngOnInit() {
      this.httpService.get('nodes?type.id=1').subscribe((res) => {
          this.posts = res;
          console.log(this.posts);
      });
  }

}
