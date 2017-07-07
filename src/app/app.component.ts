import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:any;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      


      firebase.initializeApp({
       
        apiKey: "AIzaSyBUq5B7q6mVvVazGh8RKO_uBkQ-k9xVLsQ",
        authDomain: "practice-17df5.firebaseapp.com",
        databaseURL: "https://practice-17df5.firebaseio.com",
        projectId: "practice-17df5",
        storageBucket: "practice-17df5.appspot.com",
        messagingSenderId: "211289856301"

});

    });



    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    this.rootPage = 'event-login';

  } else { 
    this.rootPage = HomePage;

  }
    });
  }

}

