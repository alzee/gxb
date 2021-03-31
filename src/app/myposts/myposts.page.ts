import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss'],
})
export class MypostsPage implements OnInit {
  userData = {
      id: 0
  };
  tasks = [];
  all = [];
  preApprove = [];
  approved = [];
  paused = [];
  stopped = [];
  envs = environment;
  seg = 'all';

  constructor(
      private storageService: StorageService,
      private httpService: HttpService,
      private router: Router,
      public alertController: AlertController
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('tasks?order%5Bdate%5D=desc&owner.id=' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.all= res;
              this.tasks = this.all;
              let that = this;
              this.all.forEach(function(i){
                  console.log(i);
                  if(i.approved){
                      that.approved.push(i);
                  }
                  else{
                      that.preApprove.push(i);
                  }
                  if(i.paused){
                      that.paused.push(i);
                  }
                  if(i.stopped){
                      that.stopped.push(i);
                  }
              });
              console.log(this.preApprove);
              console.log(this.approved);
              console.log(this.paused);
              console.log(this.stopped);
          });
      }, (rej) => {
      });
  }

  segmentChanged(ev: any) {
    this.tasks = this.all;
    switch(ev.detail.value){
        case this.statuses[0].value:
            this.tasks = this.all;
            break;
        case this.statuses[1].value:
            this.tasks = this.preApprove;
            break;
        case this.statuses[2].value:
            this.tasks = this.approved;
            break;
        case this.statuses[3].value:
            this.tasks = this.paused;
            break;
        case this.statuses[4].value:
            this.tasks = this.stopped;
            break;

    }
    console.log('Segment changed', ev.detail.value);
  }

  async pause(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '暂停任务！',
      message: '暂停后任务不会再有新的申请。已申请的不受影响。你可随时恢复该任务。',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            console.log('pause');
            let data = {
                "paused": true
            }
            this.httpService.patch('tasks/' + this.tasks[i].id, data).subscribe((res) => {
                this.tasks[i] = res;
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async unpause(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '恢复任务！',
      message: '恢复后任务可以继续接受新的申请。',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            console.log('pause');
            let data = {
                "paused": false
            }
            this.httpService.patch('tasks/' + this.tasks[i].id, data).subscribe((res) => {
                this.tasks[i] = res;
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async stop(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '下架任务！',
      message: '下架后任务无法再接受新的申请。<strong>下架后无法恢复！</strong>',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
            console.log('pause');
            let data = {
                "stopped": true
            }
            this.httpService.patch('tasks/' + this.tasks[i].id, data).subscribe((res) => {
                this.tasks[i] = res;
            });
          }
        }
      ]
    });
    await alert.present();
  }

  public statuses = [
    {
      value: 'all',
      label: '全部',
    },
    {
      value: 'done',
      label: '待审核',
    },
    {
      value: 'published',
      label: '已审核',
    },
    {
      value: 'paused',
      label: '已暂停',
    },
    {
      value: 'prePub',
      label: '已下架',
    },
  ];
}
