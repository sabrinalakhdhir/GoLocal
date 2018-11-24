import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CreateAccountPage } from '../createAccount/createAccount'

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams) {
    console.log('username', params.get('username'));
  }

  login() {
    console.log("Clicked log in");
    console.log(this.username,this.password);
    this.loggedIn = true;
    this.navCtrl.setRoot(HomePage);
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: this.username, password: this.password });
    createNewModal.present()
  }
}

