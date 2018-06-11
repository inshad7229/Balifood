import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Platform} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FCM } from '@ionic-native/fcm';
import { TranslateService } from "@ngx-translate/core";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})


export class SignupPage {
  signup
  remembers
  salonregister: FormGroup;
  confirmPassword
  userRegisterFirstTime;
  token
  constructor( public translateService:TranslateService,public platform:Platform, private fcm: FCM, public formBuilder: FormBuilder, public alertCtrl: AlertController, public securityProvider: SecurityProvider, public navCtrl: NavController) {
    this.signup = {}

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let nameReg = /^([a-zA-Z0-9._-]){2,30}$/;
    let phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    this.salonregister = formBuilder.group({
      name: ['', Validators.compose([Validators.pattern(nameReg), Validators.required])],
      useremail: ['', Validators.compose([
        Validators.pattern(emailRegex), Validators.required
      ])],
      pass: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(3), Validators.pattern(''), Validators.required])],
      cpass: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(3), Validators.pattern(''), Validators.required])],
      // contact: ['', Validators.compose([
      //   Validators.pattern(phoneRegEx), Validators.required
      // ])]
      // contact: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern(''), Validators.required])],

    });
  }

  ionViewDidLoad() {
    this.fcm.subscribeToTopic('Balifood');
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup() {
      this.platform.ready().then(() => {
              this.fcm.getToken().then(token=>{
        this.token=token
        if (this.token) {
              var a=this.signup.contactNumber.replace(/\D/g,'');
    if (this.confirmPassword == this.signup.password) {
      this.signup = {
        username: this.signup.username,
        email: this.signup.email.toLowerCase(),
        password: this.signup.password,
        contactNumber: a,
        deviceToken:this.token,
      }
      if (this.remembers == true || this.remembers == 'true' || this.remembers == "true") {
        this.securityProvider.signupopen(this.signup)
          .subscribe(data => {
            var a = data;

            if (a.success == 'true' || a.success == true || a.success == "true") {
              var b = a.userData;
              var email = b.email;
              var password = b.password;
              this.userRegisterFirstTime = 1;
              // this.navCtrl.push('LoginPage');
              this.onlogin(email, password)
            } else {
              let alert = this.alertCtrl.create({
                title: this.translateService.instant('popup.alert'),
                subTitle: a.msg,
                buttons: [this.translateService.instant('popup.ok')]
              });
              alert.present();
            }
            console.log("data" + JSON.stringify(data));
          }),
          error => {
            let alert = this.alertCtrl.create({
              title: this.translateService.instant('popup.alert'),
              subTitle: this.translateService.instant('popup.Something'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          }
      } else {
        let alert = this.alertCtrl.create({
          title:  this.translateService.instant('popup.alert'),
          subTitle: this.translateService.instant('popup.terms_condition'),
          buttons: [this.translateService.instant('popup.ok')]
        });
        alert.present();
      }
    } else {
      let alert = this.alertCtrl.create({
        title:this.translateService.instant('popup.alert'),
        subTitle:this.translateService.instant('popup.match'),
        buttons: [this.translateService.instant('popup.ok')]
      });
      alert.present();
    }
        }
})
      })
  



  } 
  
  
  onTerms() {
    this.navCtrl.push('TermsConditionsPage');
  }
  onlogin(email, password) {
    var login = {
      email: email,
      password: password,
      deviceToken:this.token,
    }
    this.securityProvider.loginopen(login)
      .subscribe(data => {
        console.log("data" + JSON.stringify(data));
        var a = data;
        if (a.success == true) {
          var b = a.userdata;
          var c = b.email;
          localStorage['authh'] = 1;
          localStorage['email'] = c;
          localStorage['user_id'] = b._id;
          localStorage['password'] = b.password;
          localStorage['username'] = b.username;
          localStorage['user_image'] = b.profileImage;
          console.log('email' + c);
          this.navCtrl.setRoot(TabsPage, {
            userRegisterFirstTime: this.userRegisterFirstTime
          });
        } else {
          let alert = this.alertCtrl.create({
            title: this.translateService.instant('popup.alert'),
            subTitle: this.translateService.instant('popup.email_pass'),
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
          localStorage['authh'] = 0;
          localStorage['email'] = '';
        }

      }),
      error => {}
  }

  getStatusFOrdisabled(cpass) {
    if (cpass == this.signup.password) {
      return true
    } else {
      return false;
    }
  }
}

