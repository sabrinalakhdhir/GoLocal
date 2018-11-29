import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CreateAccountPage } from '../createAccount/createAccount';

import { logInButton } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private user = {
    username: "",
    password: "",
    profile: ""
  }


  private loggedIn: Boolean = false;
  private username = "";
  private password = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams, public fbProvider: FirebaseProvider) {
  
  }

  login() {
    console.log("Clicked log in");
    console.log(this.username,this.password);
    this.fbProvider.logIn(this.navCtrl,this.username,this.password);
    let logInButton = "My Profile";
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: this.username, password: this.password });
    createNewModal.present()
  }
}

