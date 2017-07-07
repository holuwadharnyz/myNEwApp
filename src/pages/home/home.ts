import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupPage } from "../signup/signup";
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

    updateName(firstName: string, lastName: string): firebase.Promise<void> {
      return this.userProfile.update({
        firstName: firstName,
        lastName: lastName,
      });
    }

    updateDOB(birthDate: string): firebase.Promise<any> {
      return this.userProfile.update({
        birthDate: birthDate,
      });
    }

      updateEmail(newEmail: string, password: string): firebase.Promise<any> {
      const credential =  firebase.auth.EmailAuthProvider
        .credential(this.currentUser.email, password);

      return this.currentUser.reauthenticateWithCredential(credential)
      .then( user => {
        this.currentUser.updateEmail(newEmail).then( user => {
          this.userProfile.update({ email: newEmail });
        });
      });
    }

    updatePassword(newPassword: string, oldPassword: string):
      firebase.Promise<any> {
         const credential =  firebase.auth.EmailAuthProvider
          .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticateWithCredential(credential)
    .then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }

  constructor(public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged( user => {
    if (user){
      this.currentUser = user;
      this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
    }
  });
    
    
  }
  onLoadSignUpPage() {
    this.navCtrl.push(SignupPage);
  }
   goToProfile(){ 
    this.navCtrl.push('profile'); 
  }
  getUserProfile(): firebase.database.Reference {
  return this.userProfile;
}
  

  

}

