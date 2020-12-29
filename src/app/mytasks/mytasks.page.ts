import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public statuses = [
    {
      value: 'all',
      label: '全部',
    },
    {
      value: 'preSubmit',
      label: '待提交',
    },
    {
      value: 'reviewing',
      label: '审核中',
    },
    {
      value: 'fail',
      label: '不合格',
    },
    {
      value: 'done',
      label: '已完成',
    },
  ];

}
