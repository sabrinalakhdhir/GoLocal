import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private editProfile = false;

  private editName = false;
  private editBio = false;

  private profile = {
    name: "My Full Name",
    bio: "User bio"
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public fbProvider: FirebaseProvider) {
    this.editProfile = this.navParams.get('myProfile');
    // Check if user has stored profile details to display
    this.storage.get('user').then( user => {
      console.log(user);
      if (user.val.fullname) {
        this.profile.name = user.val.fullname;
        this.profile.bio = user.val.bio;
      }
    })
  }

  backToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  updateProfile() {
    this.storage.get('user').then( user => {
      let ID = user.id;
      let type = user.val.type;
      this.fbProvider.updateProfile(ID,type,this.profile.name,this.profile.bio);
    })
  }
}
