import { FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomePage } from '../pages/home/home';
import { Loading } from 'ionic-angular';

export class EmailValidator {

    

  static isValid(control: FormControl){
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidEmail": true
    };
    
  }
    public loginForm:FormGroup;
    public loading:Loading;

 constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authProvider: AuthProvider, public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });
    
  }
}