import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat';

import { HomePage } from '../pages/home/home';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afs: AngularFirestore) { }

  //////// USERS /////////////////

  logIn(navCtrl,username,password) {
    let user = {
      username: username,
      password: password
    }
 
    
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
          navCtrl.setRoot(HomePage, {loggedIn: true, type: userType});
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