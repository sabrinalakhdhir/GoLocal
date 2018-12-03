import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FileUploader } from 'ng2-file-upload';

import { FirebaseProvider } from '../../providers/firebase';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public uploader:FileUploader = new FileUploader({
    url: "",
    autoUpload: true
  });
  private profileImage = "";

  private editProfile = false;

  private editingName = false;
  private editingBio = false;

  private profile = {
    name: "My Full Name",
    bio: "User bio"
  }

  private activities_user = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public fbProvider: FirebaseProvider) {
    this.editProfile = this.navParams.get('myProfile');
    // Check if user has stored profile details to display
    this.storage.get('user').then( user => {
      console.log(user);
      if (user.val.image) {
        this.profile.name = user.val.name;
        this.profileImage = user.val.image;
        if (user.val.bio) {
          this.profile.bio = user.val.bio;
        } else {
          this.profile.bio = "Tell us something about yourself like your personal interests or travel goals";
        }
      }
      // Get user's activities that they booked
      this.fbProvider.getUserActivities(user.id).subscribe(actions => {
        actions.forEach(action => {
          console.log(action);
          const value = action.payload.doc.data();
          this.activities_user.push(value)
        });
      })
    })
  }

  backToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  // Edit functions

  editName() {
    this.editingName = true;
  }

  editDescription() {
    this.editingBio = true;
  }

  // When saving profile
  updateProfile() {
    this.storage.get('user').then( user => {
      let ID = user.id;
      let image = this.profileImage
      this.fbProvider.updateProfile(ID,this.profile.name,this.profile.bio,image);
    })
  }

  // Upload images
  onUpload() {
    console.log("Upload images clicked");

    let queue = this.uploader.queue;
    console.log(queue);


    if (queue.length <= 1) {
      queue.forEach( file => {
        const fileData = file._file;
        console.log(fileData.name);

        var fileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(event);
          let imageURL = event['target']['result'];
          this.profileImage = imageURL;
        };

        fileReader.readAsDataURL(fileData);
  
      });  
    } else {
      alert("Too many images. Can only upload 3 per activity");
      this.uploader.clearQueue();
    }
  
  }
}
