import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ActivityPage } from '../activity/activity';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
import { logInButton } from '../home/home';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  goToAbout() {
    this.navCtrl.push(AboutPage);
  }

  createAccountModal() {
    if (logInButton == "My Profile")
    {
      this.navCtrl.push(ProfilePage)
    }
    else {
      let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
      createNewModal.present()
    }
  }

  loginModal() {
    if (logInButton == "My Profile")
    {
      this.navCtrl.push(ProfilePage)
    }
    else {
      let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
      existingAccountModal.present()
    }
  }

}
