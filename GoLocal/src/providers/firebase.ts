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

  getGuideActivities(guide) {
    return this.afs.collection('activities',
        ref => ref.where('guide', '==', guide)).snapshotChanges();
  }

  getUserActivities(user) {
    return this.afs.collection('activities',
        ref => ref.where('user', '==', user)).snapshotChanges();
  }

  // getCategoryActivities(category) {
  //   return this.afs.collection('activities',
  //       ref => ref.where('category', '==', category)).snapshotChanges();
  // }
 
  addActivity(title,description,price,guide) {
    let activity = {
        title: title,
        description: description,
        price: price,
        guide: guide
    }
    const ID = this.afs.createId();
    this.afs.doc('/activities/'+ID).set(activity);
    alert("New activity created!");

    return ID;
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

  //////// PROFILES ////////////

  updateProfile(ID,type,name,bio) {

    let profile = {
      fullname: name,
      bio: bio
    }

    this.afs.doc('/users/'+ID).update(profile);
  }

  getGuideInfo(ID) {
    return this.afs.doc('/users/'+ID).snapshotChanges(); 
  }

}