import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { ActivityPage } from '../activity/activity';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private activities = [
    { image: 1, title: 'Activity #', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: 2, title: 'Activity #', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: 3, title: 'Activity #', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: 4, title: 'Activity #', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
  ];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()

  }
  goToActivity() {
    this.navCtrl.push(ActivityPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }


}
