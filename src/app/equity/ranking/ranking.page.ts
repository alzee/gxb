import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  users = [1, 1, 1, 1, 1, 1, 1, 1];

  constructor() { }

  ngOnInit() {
  }

}
