import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, params: NavParams) {
    console.log('UserId', params.get('userId'));
  }

  login() {
    this.navCtrl.setRoot(HomePage);
  }

}

