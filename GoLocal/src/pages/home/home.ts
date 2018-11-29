import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';


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
  logInButton = "Create Account/Log In";

  private activities = [
    { image: "assets/imgs/1.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/2.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/3.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/4.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
    { image: "assets/imgs/5.jpg", title: 'Activity ', price: 100, description: 'This is a kind of activity description with all the things that you can do!' }/**,
    { image: "assets/imgs/GoLocalLogo.png", title: 'Activity', price: 100, description: 'This is a kind of activity description with all the things that you can do!' },
  */];

  private testList;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fbProvider: FirebaseProvider, public navParams: NavParams) {
    this.testList = this.fbProvider.getActivities();
    this.logInButton = navParams.get('data');
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()

  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  goToAbout() {
    this.navCtrl.push(AboutPage);
  }

  goToActivity() {
    this.navCtrl.push(ActivityPage, { activity_ID: "" });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }
  
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  addActivity() {
    console.log("logo clicked");
    let title = "Test title";
    let description = "Test description";
    let price = 99;
    let guide = 1;
    this.fbProvider.addActivity(title,description,price,guide);
  }
}

export var logInButton;