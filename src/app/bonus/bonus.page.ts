import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.page.html',
  styleUrls: ['./bonus.page.scss'],
})
export class BonusPage implements OnInit {
  fund: number = 0;
  gold: number = 0;
  subtotal: number = 0;
  month: string;

  constructor(public toastController: ToastController) {
    let d = new Date();
    this.month = d.getFullYear() + '-' + (d.getMonth() + 1);
  }

  ngOnInit() {
  }

  public hists = [
    {
      date: '2020-11-22',
      amount: '123.55',
    },
    {
      date: '2020-11-22',
      amount: '123.55',
    },
    {
      date: '2020-11-22',
      amount: '123.55',
    },
    {
      date: '2020-11-22',
      amount: '123.55',
    },
  ];

  async showDesc() {
    const toast = await this.toastController.create({
      header: '分红说明',
      message: `
      1、每7天分红一次，分红标准是平台的收入（会员充值和发布任务的手续费）的50%参与分红，除以当期有多少个共享宝=每个共享宝的分红基数x个人的共享宝个数=当期分红金额。
      2、参与分红的条件是达到10个共享宝的人参与分红。
      3、任务大厅发布任务，任务可以选择推荐、置顶、暂停，取消四种状态。推荐、置顶需要购买，时效是24小时，过期了再买。`,
      color: '#fff',
      position: 'middle',
      buttons: [
        {
          text: '确定',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  showMonth() {
    console.log(this.month);
  }
}
