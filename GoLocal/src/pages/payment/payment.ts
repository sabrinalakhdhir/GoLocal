import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase';

import { HomePage } from '../home/home';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  private activity = {
    id: "",
    title: "Activity #",
    price: 100,
    image: "",
    // date: "Oct.3",
    // time: "10am - 1pm",
    guide: "Rocky Climber"
  }

  private billing = {};
  private payment = {};

  private months = [1,2,3,4,5,6,7,8,9,10,11,12];
  private days = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public fbProvider: FirebaseProvider, public storage: Storage) {
    let activity = this.navParams.get('activity');
    let activity_ID = this.navParams.get('ID');
    let guide = this.navParams.get('guide');

    this.activity = activity;
    this.activity.id = activity_ID;
    this.activity.guide = guide.name;

    console.log(this.activity);
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { userId: 123456});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { userId: 123456});
    existingAccountModal.present()
  }

  onCancel() {
    this.navCtrl.setRoot(HomePage, { loggedIn: true });
  }

  onConfirm() {
    this.storage.get('user').then( user => {
      this.fbProvider.bookActivity(this.activity.id,user.id);
    })
    this.navCtrl.setRoot(HomePage, { loggedIn: true });
  }

}
