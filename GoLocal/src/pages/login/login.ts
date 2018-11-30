import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
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

  private username = "";
  private password = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams, public fbProvider: FirebaseProvider) {
  
  }

  login() {
    console.log("Clicked log in");
    console.log(this.username,this.password);
    this.fbProvider.logIn(this.navCtrl,this.username,this.password)
      .subscribe( user => {
        if (user.length > 0) {
          if (user[0]['type'] == 1) {
            console.log(user[0]['type']);
            console.log("Guide logged in. Going to dashboard");
            this.navCtrl.setRoot(DashboardPage, {
              loggedIn: true,
              name: user[0]['username']
            });
          } else {
            this.navCtrl.setRoot(HomePage, {
              loggedIn: true,
              name: user[0]['username']
            });
          }
        } else {
          alert("Username/password did not match. Try again.")
        }
      }, error => {
        console.log("Could not log in. Try again");
      })
;
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: this.username, password: this.password });
    createNewModal.present()
  }
}

