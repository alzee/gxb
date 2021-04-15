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
  envs = environment;
  seg = 0;

  public statuses = [
    {
      id: 0,
      label: '全部',
    },
    {
      id: 1,
      label: '待审核',
    },
    {
      id: 2,
      label: '已审核',
    },
    {
      id: 3,
      label: '已暂停',
    },
    {
      id: 4,
      label: '已下架',
    },
  ];

  constructor(
      private storageService: StorageService,
      private httpService: HttpService,
      private router: Router,
      public alertController: AlertController
  ) { }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('tasks?order%5Bdate%5D=desc&owner.id=' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.tasks = res1;
          });
      }, (rej) => {
      });
  }

  segmentChanged(ev: any) {
    this.seg = ev.detail.value;
    // console.log(this.seg);
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
            const data = {
                status: '/api/statuses/3'
            };
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
            const data = {
                status: '/api/statuses/2'
            };
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
            const data = {
                status: '/api/statuses/4'
            };
            this.httpService.patch('tasks/' + this.tasks[i].id, data).subscribe((res) => {
                this.tasks[i] = res;
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
