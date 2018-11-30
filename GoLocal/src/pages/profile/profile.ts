import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public fbProvider: FirebaseProvider) {
  }

  backToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  addProfile() {
    let ID = "V5afIlU3gdP8xdKhzyOF";
    this.fbProvider.updateProfile(ID,0,"","","");
  }
}
