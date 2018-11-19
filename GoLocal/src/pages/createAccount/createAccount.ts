import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-createAccount',
  templateUrl: 'createAccount.html'
})
export class CreateAccountPage {

  constructor(public navCtrl: NavController, params: NavParams) {
    console.log('username', params.get('username'));
  }

  createAccount() {
    
    this.navCtrl.setRoot(HomePage);
  }

}

