import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';

import { AboutPage } from '../about/about';
import { HomePage, logInButton } from '../home/home';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
import { PaymentPage } from '../payment/payment';
import { isString } from 'ionic-angular/util/util';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private guide = 0;

  private guideData = {
    name: "Rocky Climber",
    subtitle: "The bestest boulderer around",
    contact: "rocky@climbeverything.com"
  }
  constructor(public navCtrl: NavController) {
  }

  backToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
