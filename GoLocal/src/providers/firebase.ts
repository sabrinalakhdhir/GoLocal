import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }

  //////// USERS /////////////////

  addUser(username,password,userType) {
    let user = {
      username: username,
      password: password,
    }
    if (userType == '1') {
      this.afd.list('/user/guides').push(user);
    } else {
      this.afd.list('/user/travellers').push(user);
    }
  }

  removeUser(ID,userType) {
    if (userType == '1') {
      this.afd.list('/user/guides').remove(ID);
    } else {
      this.afd.list('/user/travellers').remove(ID);
    }
  }
 
  //////// ACTIVITIES ////////////

  getActivities() {
    return this.afd.list('/activities/');
  }
 
  addActivity(title,description,price,guide) {
    let activity = {
        title: title,
        description: description,
        price: price,
        guide: guide
    }
    this.afd.list('/activities/').push(activity);
  }

  updateActivity(ID,title,description,price,guide) {
    let activity = {
        title: title,
        description: description,
        price: price,
        guide: guide
    }
    this.afd.object('/activities/'+ID).update(activity);
  }

  bookActivity(ID,traveller) {
    this.afd.list('/activities/'+ID).push(traveller);
  }
 
  removeActivity(id) {
    this.afd.list('/activities/').remove(id);
  }
}