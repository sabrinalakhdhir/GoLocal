import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private var1 = 1;
  private arr = [
    { value: 1 },
    { value: 2 },
    { value: 3 }
  ];

  constructor(public navCtrl: NavController) {

  }

  goToAbout() {
    this.navCtrl.setRoot(AboutPage);
  }

  increment() {
    this.var1++;
  }

}
