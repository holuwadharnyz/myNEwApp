import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  public profileProvider: ProfileProvider, public authProvider: AuthProvider){
    
  }

  ionViewDidEnter() {
  this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
    this.userProfile = userProfileSnapshot.val();
    this.birthDate = userProfileSnapshot.val().birthDate;
  });
}
  logOut(){
  this.authProvider.logoutUser().then(() => {
    this.navCtrl.setRoot('login');
  });
}
  

logoutUser(): firebase.Promise<void> {
  firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).off();

  return firebase.auth().signOut();
}

  updateDOB(birthDate){
  this.profileProvider.updateDOB(birthDate);
  }

  updateName(){
  let alert = this.alertCtrl.create({
    message: "Your first name & last name",
    inputs: [
      {
        name: 'firstName',
        placeholder: 'Your first name',
        value: this.userProfile.firstName
      },
      {
        name: 'lastName',
        placeholder: 'Your last name',
        value: this.userProfile.lastName
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileProvider.updateName(data.firstName, data.lastName);
        }
      }
    ]
  });
  alert.present();
}
  



}

 