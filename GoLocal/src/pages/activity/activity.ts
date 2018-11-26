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

  // To set edit mode if guide user
  private isGuide = true;

  // To check if new activity or editing existing one
  private newActivity = true;

  // Elements of an activity
  private title = "";
  private price = 0;
  private description = "";

  private guide = 0;

  private activity = {
    title: "Activity Title",
    price: 100,
    description: "Bunch of stuff goes here"
  }

  private guideData = {
    name: "Rocky Climber",
    subtitle: "The bestest boulderer around",
    contact: "rocky@climbeverything.com"
  }

  // Values for month and day dropdown menus
  private months = [1,2,3,4,5,6,7,8,9,10,11,12];
  private days = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public fbProvider: FirebaseProvider) {
      // navParams.get('activity').then( data => {
      //   this.activity = data;
      // })
      for (var i=0; i<31; i++) { this.days.push(i); }
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { });
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { });
    existingAccountModal.present()
  }

  onBook() {
    this.navCtrl.setRoot(PaymentPage);
  }

  goToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  onSave() {
    console.log("logo clicked");
    this.navParams.get('activity_ID').then( ID => {
      if (ID) {
        this.fbProvider.updateActivity(ID,this.title,this.description,this.price,this.guide);
      } else {
        this.fbProvider.addActivity(this.title,this.description,this.price,this.guide)
      }
    })
  }

}
