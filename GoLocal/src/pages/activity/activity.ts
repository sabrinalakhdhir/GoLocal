import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  private activity = {
    title: "Activity #",
    price: 100,
    description: "Bunch of stuff goes here"
  }

  private guide = {
    name: "Rocky Climber",
    subtitle: "The bestest boulderer around",
    contact: "rocky@climbeverything.com"
  }

  private months = [1,2,3,4,5,6,7,8,9,10,11,12];
  private days = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public fbProvider: FirebaseProvider) {
      navParams.get('activity').then( data => {
        this.activity = data;
      })
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { userId: 123456});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { userId: 123456});
    existingAccountModal.present()
  }

  onBook() {
    this.navCtrl.push(PaymentPage);
  }

  goToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

}
