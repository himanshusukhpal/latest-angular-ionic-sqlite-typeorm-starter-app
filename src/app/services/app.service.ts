import appPackage from "../../../package.json";

import { Injectable } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertService } from "./alert/alert.service";


@Injectable({
  providedIn: 'root',
})
export class AppService {

  appVersion = appPackage.version;

  constructor(
    public alert: AlertService,
    private navCtrl: NavController,
    private loadCtrl: LoadingController
  ) {
    this.initialize();
  }

  async initialize() {
    try {

    } catch (e) {

    }
  }

  navRootForward = (path: string) => {
    return this.navCtrl.navigateRoot(path, {
      animated: true,
      animationDirection: 'forward',
    });
  };

  navRootBack = (path: string) => {
    return this.navCtrl.navigateRoot(path, {
      animated: true,
      animationDirection: 'back',
    });
  };

  async presentLoading(message: string) {
    const loader = await this.loadCtrl.create({
      message: message,
      spinner: 'bubbles',
      backdropDismiss: false
    });
    await loader.present();
    return loader;
  }
  dismissLoading = () => this.loadCtrl.dismiss();

}
