import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs-compat';
import { switchMap } from 'rxjs/operators';

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
        .where('password', '==', password));
        
    return query;
  }

  addUser(navCtrl,username,password,userType,name,contact) {
    let user = {
      username: username,
      password: password,
      type: userType,
      name: name,
      contact: contact
    }

    const ID = this.afs.createId();
    this.afs.doc('/users/'+ID).set(user);
    
    return this.afs.doc('/users/'+ID);
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
    return this.afs.collection('/activities').snapshotChanges();
  }

  getGuideBookedActivities(guide) {
    return this.afs.collection('activities',
        ref => ref.where('guide', '==', guide)
        .where('traveller', '<', "")
        .where('traveller', '>', ""))
        .snapshotChanges();
  }

  getGuideActivities(guide) {
    return this.afs.collection('activities',
        ref => ref.where('guide', '==', guide)).snapshotChanges();
  }

  getUserActivities(user) {
    return this.afs.collection('activities',
        ref => ref.where('traveller', '==', user)).snapshotChanges();
  }

  // getCategoryActivities(category) {
  //   return this.afs.collection('activities',
  //       ref => ref.where('category', '==', category)).snapshotChanges();
  // }
 
  addActivity(title,category,description,price,guide,images) {
    let activity = {
        title: title,
        category: category,
        description: description,
        price: price,
        guide: guide,
        images: images
    }
    const ID = this.afs.createId();
    this.afs.doc('/activities/'+ID).set(activity).then( () => {
      alert("New activity created!");
      return ID;
    }).catch( error => {
      alert("Was a problem adding the activity. Try again.");
    });

    return ID;
  }

  updateActivity(ID,title,category,description,price,guide,images) {
    let activity = {
        title: title,
        category: parseInt(category),
        description: description,
        price: price,
        guide: guide,
        images: images
    }
    this.afs.doc('/activities/'+ID).update(activity).then( () => {
      alert("Activity details saved!")
    }).catch( error => {
      alert("Was a problem saving the activity. Try again.");
    });
  }

  bookActivity(ID,traveller) {
    this.afs.doc('/activities/'+ID).update({traveller:traveller});
    alert("Activity successfully booked!");
  }
 
  removeActivity(ID) {
    this.afs.doc('/activities/'+ID).delete();
  }

  //////// PROFILES ////////////

  updateProfile(ID,name,bio,image) {

    let profile = {
      fullname: name,
      bio: bio,
      image: image
    }

    this.afs.doc('/users/'+ID).update(profile);
  }

  getGuideInfo(ID) {
    return this.afs.doc('/users/'+ID).snapshotChanges(); 
  }

}