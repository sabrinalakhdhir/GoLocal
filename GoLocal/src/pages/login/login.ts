import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, params: NavParams) {
    console.log('username', params.get('username'));
  }

  login() {
    this.navCtrl.setRoot(HomePage);
  }

}

