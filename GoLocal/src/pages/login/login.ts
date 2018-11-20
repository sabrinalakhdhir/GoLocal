import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CreateAccountPage } from '../createAccount/createAccount'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams) {
    console.log('username', params.get('username'));
  }

  login() {
    this.navCtrl.setRoot(HomePage);
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }
}

