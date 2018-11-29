import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable, Subject } from 'rxjs-compat';
// import { switchMap } from 'rxjs/operators';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutPage } from '../pages/about/about';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afs: AngularFirestore) { }

  //////// USERS /////////////////

  logIn(navCtrl,username,password) { 
    let query = this.afs.collection('users', 
        ref => ref.where('username', '==', username)
        .where('password', '==', password))
        .valueChanges()
        .subscribe( user => {
          console.log(user[0]['type']);
          if (user[0]['type'] == 1) {
            console.log("Guide logged in. Going to dashboard");
            navCtrl.setRoot(AboutPage);
          } else {
            navCtrl.setRoot(HomePage);
          }
        }, error => {
          console.log("Could not log in. Try again");
        })
    
  }

  addUser(navCtrl,username,password,userType) {
    let user = {
      username: username,
      password: password,
      type: userType,
    }

    const ID = this.afs.createId();
    this.afs.doc('/users/'+ID).set(user)
        .then( data => {
          console.log("User added");
          if (userType == 1) {
            navCtrl.setRoot(HomePage);
          } else {
            navCtrl.setRoot(HomePage);
          }
        }, error => {
          console.log(error);
          alert("Could not create new acccount. Try again.");
        });
  }

  removeUser(ID,userType) {
    if (userType == '1') {
      this.afs.doc('/users/'+ID).delete();
    } else {
      this.afs.doc('/users/'+ID).delete();
    }
  }
 
  //////// ACTIVITIES ////////////

  getActivities() {
    return this.afs.collection('/activities').valueChanges();
  }
 
  addActivity(title,description,price,guide) {
    let activity = {
        title: title,
        description: description,
        price: price,
        guide: guide
    }
    const ID = this.afs.createId();
    this.afs.doc('/activities/'+ID).set(activity);
  }

  updateActivity(ID,title,description,price,guide) {
    let activity = {
        title: title,
        description: description,
        price: price,
        guide: guide
    }
    this.afs.doc('/activities/'+ID).update(activity);
  }

  bookActivity(ID,traveller) {
    this.afs.doc('/activities/'+ID+'/traveller').set(traveller);
  }
 
  removeActivity(ID) {
    this.afs.doc('/activities/'+ID).delete();
  }
}