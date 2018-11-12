import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { userId: 123456});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { userId: 123456});
    existingAccountModal.present()

  }
  goToAbout() {
    this.navCtrl.setRoot(AboutPage);
  }

  goToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  increment() {
    this.var1++;
  }

}
