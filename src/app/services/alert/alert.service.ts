/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, ToastController } from '@ionic/angular';
import { blockApp, getErrorMessage } from '../../utils/error.utils';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) { }

  async show(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom' ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position
    });
    toast.present();
  }

  async showSuccessMessage(requestOrigin: string, message: string) {
    const toast = await this.toastCtrl.create({
      message: requestOrigin+': '+message,
      color : 'success',
      duration: 2000
    });
    toast.present();
  }

  async showError(requestOrigin: string, error: any, duration: number = 3700) {
    const message = `${requestOrigin}: ${getErrorMessage(error)}`;
    const toast = await this.toastCtrl.create({
      message,
      color : 'danger',
      duration
    });
    toast.present();
    if(message.includes('Transaction is not started yet')) {
      blockApp(error);
    }
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertCtrl.create(options)
    await alert.present();
    return alert;
  }

}
