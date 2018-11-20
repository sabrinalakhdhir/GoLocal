import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Modal } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-createAccount',
  templateUrl: 'createAccount.html'
})
export class CreateAccountPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams) {
    console.log('username', params.get('username'));
  }

  createAccount() {
    
    this.navCtrl.setRoot(HomePage);
  }
  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()
  }

}

