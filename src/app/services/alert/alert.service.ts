import { Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  ToastController,
} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) { }

  async show(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position,
    });
    toast.present();
  }

  async showSuccessMessage(origin: string, message: string) {
    const toast = await this.toastCtrl.create({
      message: origin + ': ' + message,
      color: 'success',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async showError(origin: string, error: any, duration: number = 3700) {
    let message = 'Error';
    if (typeof error === 'object' || typeof error === 'symbol') {
      if (error.length == undefined) {
        if (error['message']) message = error.message;
        if (error['error']) {
          if (
            (typeof error.error === 'object' ||
              typeof error.error === 'symbol') &&
            error.error['message']
          )
            message = error.error.message;
        }
      } else if (error.length != 0) {
        message = error
          .map((err: any) => `${err.field} : ${err.message}`)
          .join('\n\n');
      }
    } else message = error;
    message = `${origin}: ${message}`;

    const toast = await this.toastCtrl.create({
      message,
      duration,
      cssClass: 'error',
      position: 'bottom',
    });
    toast.present();
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }
}
