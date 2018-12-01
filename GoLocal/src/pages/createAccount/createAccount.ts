import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { logInButton } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { DashboardPage } from '../dashboard/dashboard';

import { FirebaseProvider } from '../../providers/firebase';

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
  private userType = 0;

  private fullname = "";
  private contact = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams, public storage: Storage, public fbProvider: FirebaseProvider) {

    console.log('username', params.get('username'));
  }

  createAccount() {
    console.log("Clicked create account");
    console.log(this.username,this.password,this.userType);
    let user = this.fbProvider.addUser(this.navCtrl,this.username,this.password,this.userType,this.fullname, this.contact);

    // Convert data to normal object and store in local storage
    // user.snapshotChanges().subscribe( user => {
    //     console.log(action);
    //     const value = action.payload.doc.data();
    //     const id = action.payload.doc.id;
    //     this.storage.set('user' ,{
    //       id: id,
    //       val: value
    //     });
    //   });
    // })

    user.snapshotChanges().subscribe( user => {
      console.log("User added");
      let id = user.payload.id;
      let value = user.payload.data();
      // Store user info locally
      this.storage.set('user', {
        id: id,
        val: value
      })
      // Route to appropriate page for user type
      if (value['userType'] == 1) {
        this.navCtrl.setRoot(DashboardPage, {
          loggedIn: true,
          name: name,
          id: id
        });
      } else {
        this.navCtrl.setRoot(HomePage, {
          loggedIn: true,
          name: name,
        });
      }
    }, error => {
      console.log(error);
      alert("Could not create new acccount. Try again.");
    });
    // if (this.loggedIn) {
    //   let logInButton = "My Profile";
    //   this.navCtrl.setRoot(HomePage, {data: logInButton});
    // } else {
    //   alert("Could not log in. Try again.");
    // }
  }
  
  loginModal() {
    if (logInButton == "My Profile")
    {
      this.navCtrl.push(ProfilePage)
    }
    else {
      let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
      existingAccountModal.present()
    }
  }

}
