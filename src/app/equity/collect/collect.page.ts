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
  postData ={
      amount: 1,
      user: '',
  } ;
  animation: Animation;
  //amount: number = 1;

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
      this.myGxb = this.userData.gxb;
      this.avatarUrl = this.userData.avatar;
      this.httpService.get('gxbs?page=1&order%5Bdate%5D=desc&itemsPerPage=30&user=' + this.uid).subscribe((res) => {
          this.hists = res;
          console.log(res);
          console.log(this.uid);
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
      //this.postData.amount = this.amount;
      this.postData.user = '/api/users/' + this.uid;
      this.httpService.post('gxbs', this.postData).subscribe((res) => {
          console.log(res);
          this.hists.unshift(res);
          this.toastService.presentToast('GXB +1');
          this.dismiss();
      });
      console.log('collected');
  }

}
