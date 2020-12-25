import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast() {
      const toast = await this.toastController.create({
          message: '验证码已发送。',
          duration: 2000,
          position: 'middle',
          color: 'dark',
      });
      toast.present();
  }
}
