import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { Animation, AnimationController } from '@ionic/angular';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-collect',
  templateUrl: './collect.page.html',
  styleUrls: ['./collect.page.scss'],
})
export class CollectPage implements OnInit {
  env = environment;
  hists = [];
  myGxb: number;
  avatarUrl: string;
  uid: number;
  userData: Data;
  user: Data;
  collected = true;
  clicked = false;
  type = 1;
  amount: number;
  animation: Animation;
  query = 'page=1&order%5Bdate%5D=desc&itemsPerPage=10&type=1';

  constructor(
      private storageService: StorageService,
      private toastService: ToastService,
      private httpService: HttpService,
      private animationCtrl: AnimationController
  ) {
  }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      console.log(res);
      this.userData = res;
      this.uid = this.userData.id;
      this.avatarUrl = this.userData.avatar;

      this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
          this.user = res1;
          console.log(res1);
          this.myGxb = this.user.gxb;
          this.amount = this.user.equity;
      });

      this.httpService.get(`gxbs?${this.query}&user.id=${this.uid}`).subscribe((res2) => {
          this.hists = res2;
          console.log(res2);
          console.log(this.type);
          if (this.hists[0]){
              if (new Date(this.hists[0].date).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
                 // && this.hists[0].type === this.type
                 ){
                  this.collected = false;
              }
          }
      });
    });

    this.animation = this.animationCtrl.create()
    .addElement(document.querySelector('#text'));

    this.animation.duration(1000)
    .iterations(Infinity)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.5)', opacity: '1' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);
    this.animation.play();
  }

  dismiss(){
    this.animation = this.animationCtrl.create()
    .addElement(document.querySelector('#text'));
    this.animation
    .duration(800)
    .keyframes([ ])
    .fromTo('transform', 'translateY(0px)', 'translateY(-100px)')
    .fromTo('opacity', '1', '0');
    this.animation.play();
  }

  collectGxb() {
      const postData = {
          amount: this.amount,
          user: '/api/users/' + this.uid,
          type: this.type
      } ;
      if (!this.clicked) {
          this.httpService.post('gxbs', postData).subscribe((res) => {
              console.log(res);
              this.hists.unshift(res);
              this.toastService.presentToast('GXB +1 <p>每天1次机会，记得明天再来哦</p>');
              this.dismiss();
              this.myGxb = this.myGxb + this.amount;
              this.collected = true;
          });
      }
      this.clicked = true;
  }

}
