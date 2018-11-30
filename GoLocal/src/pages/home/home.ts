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
    { image: "assets/imgs/5.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/GoLocalLogo.png", title: 'Activity', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
  ];

  private activitiesDB;
  private activitiesData = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fbProvider: FirebaseProvider, public navParams: NavParams) {
    // Get list from Firestore
    this.activitiesDB = this.fbProvider.getActivities();
    // Convert Firestore object to normal object
    this.activitiesDB.subscribe(actions => {
      actions.forEach(action => {
        const value = action.payload.doc.data();
        const id = action.payload.doc.id;
        this.activitiesData.push({
          id: id,
          val: value
        });
      });
    })
    console.log(this.activitiesData);
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

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()
  }

  goToActivity(activity) {
    console.log("Activity clicked");
    console.log(activity);
    this.navCtrl.push(ActivityPage, {
      loggedIn: this.loggedIn,
      userType: 0, 
      activity: activity });
  }

  goToProfile() {
    console.log("Profile clicked");
    this.navCtrl.push(ProfilePage, {
      loggedIn: this.loggedIn
    });
  }

  goToDashboard() {
    console.log("Dashboard clicked");
    this.navCtrl.push(DashboardPage, {
      loggedIn: this.loggedIn
    });
  }
  
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}

export var logInButton;