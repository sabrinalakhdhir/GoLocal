import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { ActivityPage } from '../activity/activity';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {

  private loggedIn = true;
  private logInButton = "Profile";

  private username;

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,  public fbProvider: FirebaseProvider, public storage: Storage, public navParams: NavParams) {
    this.username = this.navParams.get('name')
    this.logInButton = this.username + "'s Profile";
    
    this.storage.get('user').then( user => {
      let guideID = user.id;
      console.log(guideID);
      // Get list from Firestore
      this.activitiesDB = this.fbProvider.getGuideActivities(guideID);
      // Convert Firestore object to normal object
      this.activitiesDB.subscribe(activities => {
        activities.forEach(activity => {
          console.log(activity.payload.doc.data());
          const value = activity.payload.doc.data();
          const id = activity.payload.doc.id;
          this.activitiesData.push({
            id: id,
            val: value
          });
        });
      })
      console.log(this.activitiesData);
    })
    
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()
  }

  addActivity() {
    this.storage.get('user').then( user => {
      let id = user.id;
      const activity = {
        id: null,
        val: {
          title: "Click edit button to change title",
          price: 0,
          description: "Click edit button to change description",
          guide: id
        }
      }
      this.navCtrl.push(ActivityPage, {
        userType: 1,
        activity: activity
      })
    })
    
  }

  goToActivity(activity) {
    this.navCtrl.push(ActivityPage, { userType: 1, activity: activity });
  }

  goToProfile() {
    console.log("Profile clicked");
    this.navCtrl.push(ProfilePage, {
      myProfile: true
    });
  }

}

export var logInButton;