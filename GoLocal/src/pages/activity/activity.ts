import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
import { PaymentPage } from '../payment/payment';
import { isString } from 'ionic-angular/util/util';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  // To set edit mode if guide user
  private isGuide = true;

  // To check if new activity or editing existing one
  private newActivity = true;

  // To check if an element is being edited
  private editingTitle = false;
  private editingPrice = false;
  private editingDescription = false;

  private guide = 0;
  private traveller = "";

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

  // onBook() {
  //   this.navCtrl.setRoot(PaymentPage);
  // }

  goToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  // Edit functions
  editImages() {}

  editTitle() {
    this.editingTitle = true;
  }

  editPrice() {
    this.editingPrice = true;
  }

  editDescription() {
    this.editingPrice = true;
  }

  onBook() {
    let ID = this.navParams.get('activity_ID');
    this.fbProvider.bookActivity(ID,this.traveller);
  }

  // Save changes to activity or add new one (FOR GUIDES)
  onSave() {
    console.log("logo clicked");
    // Convert price to integer since it is string from ion-input
    if (isString(this.activity.price)) {
      this.activity.price = parseInt(this.activity.price);
    }
    // If existing activity was clicked it will pass it forward
    // If adding new activity there will be no ID
    let ID = this.navParams.get('activity_ID');
    if (ID != "") {
      console.log("Updating activity");
      this.fbProvider.updateActivity(ID,this.activity.title,this.activity.description,this.activity.price,this.guide);
    } else {
      console.log("Adding new activity");
      this.fbProvider.addActivity(this.activity.title,this.activity.description,this.activity.price,this.guide)
    }

  }

}
