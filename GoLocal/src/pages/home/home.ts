import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';
import { map } from 'rxjs/operators';

import { DashboardPage } from '../dashboard/dashboard';
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

  @ViewChild('slides') slides: Slides;

  private loggedIn = false;
  private logInButton = "Create Account/Log In";

  private activities = [
    { image: "assets/imgs/1.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/2.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/3.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/4.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/5.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' }/**,
    { image: "assets/imgs/GoLocalLogo.png", title: 'Activity', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
  */];


  private activitiesDB;
  private activities_featured = [];
  private activities_regular = [];

  private categorySelected = -1;
  private categoryHeading = "";
  private activities_category = [];

  private activities_cat1 = [];
  private activities_cat2 = [];
  private activities_cat3 = [];
  private activities_cat4 = [];
  private activities_cat5 = [];
  private activities_cat6 = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fbProvider: FirebaseProvider, public navParams: NavParams) {
    // Get list from Firestore
    this.activitiesDB = this.fbProvider.getActivities();
    // Convert Firestore object to normal object
    this.activitiesDB.subscribe(actions => {
      actions.forEach(action => {
        console.log(action);
        const value = action.payload.doc.data();
        const id = action.payload.doc.id;
        this.addToActivityArray(id,value.category,value);
      });
    })
    console.log(this.activities_regular);
    console.log(this.activities_featured);
  }

  addToActivityArray(id,category,activityInfo) {
    let activity = {
      id: id,
      val: activityInfo
    }
    switch (category) {
      case 1: this.activities_cat1.push(activity); this.activities_regular.push(activity);break;
      case 2: this.activities_cat2.push(activity); this.activities_regular.push(activity); break;
      case 3: this.activities_cat3.push(activity); this.activities_regular.push(activity); break;
      case 4: this.activities_cat4.push(activity); this.activities_regular.push(activity); break;
      case 5: this.activities_cat5.push(activity); this.activities_regular.push(activity); break;
      case 6: this.activities_cat6.push(activity); this.activities_regular.push(activity); break;
      case 99: this.activities_featured.push(activity); break;
      default: this.activities_regular.push(activity); break;
    }
  }

  ionViewDidEnter() {
    console.log("Home entered");
    let loggedIn = this.navParams.get('loggedIn');
    let name = this.navParams.get('name');
    if (loggedIn) {
      this.loggedIn = true;
      this.logInButton = name + "'s Profile";
    }
  }

  showCategory(category) {
    this.categorySelected = category;
    switch (category) {
      case 1: this.activities_category = this.activities_cat1;
              this.categoryHeading = "First"; break;
      case 2: this.activities_category = this.activities_cat2;
              this.categoryHeading = "Second"; break;
      case 3: this.activities_category = this.activities_cat3;
              this.categoryHeading = "Third"; break;
      case 4: this.activities_category = this.activities_cat4;
              this.categoryHeading = "Fourth"; break;
      case 5: this.activities_category = this.activities_cat5;
              this.categoryHeading = "Fifth"; break;
      case 6: this.activities_category = this.activities_cat6;
              this.categoryHeading = "Sixth"; break;
      default: this.activities_category = [];
              this.categoryHeading = ""; break;
    }
  }



  /////// Accounts /////////

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()
  }
  
  /////// Routing //////////

  goToActivity(activity) {
    console.log("Activity clicked");
    console.log(activity);
    this.navCtrl.push(ActivityPage, {
      loggedIn: this.loggedIn,
      userType: 0, 
      activity: activity,
    });
  }

  goToProfile() {
    console.log("Profile clicked");
    this.navCtrl.push(ProfilePage, {
      myProfile: true
    });
  }

  goToAbout() {
    console.log("About clicked");
    this.navCtrl.push(AboutPage);
  }
  
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}

export var logInButton;