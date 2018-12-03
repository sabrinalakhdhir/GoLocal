import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { CreateAccountPage } from '../createAccount/createAccount';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

import { logInButton } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase';

@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html'
})
export class AgreementPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
     params: NavParams, public fbProvider: FirebaseProvider, public storage: Storage) {
  
  }

  agreed() {
    this.navCtrl.setRoot(CreateAccountPage);
  }

  notAgreed() {
    this.navCtrl.setRoot(HomePage);
  }

}

