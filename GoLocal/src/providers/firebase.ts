import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }
 
  getActivities() {
    return this.afd.list('/activities/');
  }
 
  addItem(title,description,price,guide) {
    let activity = {
        title: title,
        description: description,
        price: price,
        guide: guide
    }
    this.afd.list('/activities/').push(activity);
  }
 
  removeItem(id) {
    this.afd.list('/activities/').remove(id);
  }
}