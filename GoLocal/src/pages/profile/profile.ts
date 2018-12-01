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

  private activities_user = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public fbProvider: FirebaseProvider) {
    this.editProfile = this.navParams.get('myProfile');
    // Check if user has stored profile details to display
    this.storage.get('user').then( user => {
      console.log(user);
      if (user.val.name) {
        this.profile.name = user.val.name;
        if (user.val.bio) {
          this.profile.bio = user.val.bio;
        } else {
          this.profile.bio = "Tell us something about yourself like your personal interests or travel goals";
        }
      }
      // Get user's activities that they booked
      this.fbProvider.getUserActivities(user.id).subscribe(actions => {
        actions.forEach(action => {
          console.log(action);
          const value = action.payload.doc.data();
          const id = action.payload.doc.id;
          this.activities_user.push(value)
        });
      })
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
