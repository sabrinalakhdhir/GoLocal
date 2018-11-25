import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Modal } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { logInButton } from '../home/home';

@Component({
  selector: 'page-createAccount',
  templateUrl: 'createAccount.html'
})
export class CreateAccountPage {

  private user = {
    username: "",
    password: "",
    profile: ""
  }

  private loggedIn: Boolean = false;
  private username = "";
  private password = "";
  private userType = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams) {
    console.log('username', params.get('username'));
  }

  createAccount() {
    console.log("Clicked create account");
    console.log(this.username,this.password,this.userType);
    this.loggedIn = true;
    let logInButton = "My Profile";
    this.navCtrl.setRoot(HomePage, {data: logInButton});
  }
  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: this.username, password: this.password });
    existingAccountModal.present()
  }

}

