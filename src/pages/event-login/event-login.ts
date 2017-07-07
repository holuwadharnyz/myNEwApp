import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the EventLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'event-login'
})
@Component({
  selector: 'page-event-login',
  templateUrl: 'event-login.html',
})
export class EventLoginPage {
   public loginForm:FormGroup;
    public loading:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  
loginUser(): void {
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authProvider.loginUser(this.loginForm.value.email)
        this.loginForm.value.password
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}


goToSignup(): void { this.navCtrl.push('signup'); }

goToResetPassword(): void { this.navCtrl.push('reset-password'); }

  
}
