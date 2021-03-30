import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(public toastController: ToastController) {}

    async presentToast(infoMessage: string) {
        const toast = await this.toastController.create({
            message: infoMessage,
            position: 'middle',
            color: 'warning',
            duration: 2000
        });
        toast.present();
    }
}
