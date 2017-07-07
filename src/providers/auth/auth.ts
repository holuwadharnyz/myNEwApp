import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Http } from '@angular/http';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/


@Injectable()
export class AuthData {
  constructor() {}
}

export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');

  }
 /*LOGIN*/
  loginUser(email: string, password: string): firebase.Promise < any > {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
  /*SIGN-UP*/
  signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: email });
  });
    }

  /*RESET PASSWORD*/
  resetPassword(email: string): firebase.Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
    }
  /*LOG OUT*/
  logoutUser(): firebase.Promise<void> {
  return firebase.auth().signOut();
    }

    
}
