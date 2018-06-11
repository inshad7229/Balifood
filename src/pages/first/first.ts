import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Config} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { Events ,LoadingController, AlertController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
    providers: [
	Facebook
  ]
})


export class FirstPage {
  FB_APP_ID: number = 209490229604239;
  constructor(public config: Config,public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams, private fb: Facebook, private translate: TranslateService,  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.fb.browserInit(this.FB_APP_ID, "v2.11");
	this.showBanner();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }
  login() {
    this.navCtrl.push('LoginPage')
  }
  signup() {
    this.navCtrl.push('SignupPage')
  }
    showBanner() {
 //this.fb_login();
        
 
    }

fb_logout() {
  this.fb.getLoginStatus().then( data=>{
  	if (data.status =='connected'){
  	  this.fb.logout()
  	}
    }
  )
}
  fb_login() {
	this.fb_logout();
	let loading = this.loadingCtrl.create({content: 'Please wait...'});
    let permissions = new Array();
    permissions = ["public_profile","email", "user_friends"];
    this.fb.login(permissions)
    .then((response)=>{
      loading.dismiss();
      let userId = response.authResponse.userID;
      let params = new Array();
      this.fb.api("/me?fields=name,gender,email,id,friends", params)
      .then((user)=>{
		let alert = this.alertCtrl.create({
			title: this.translate.instant('popup.alert'),
			subTitle: JSON.stringify(user),
			buttons: [this.translate.instant('popup.ok')]
		  });
		  alert.present();
	  
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        this.facebook(user.email,user.name,userId,user.picture)
      })
    },(error)=>{
      let alert = this.alertCtrl.create({
        title: this.translate.instant('popup.alert'),
        subTitle: JSON.stringify(error),
        buttons: [this.translate.instant('popup.ok')]
      });
      alert.present();
    }) 
  }

  facebook(user_email, user_name, userId, user_picture) {
	 // alert('here');
    var login_fb = {
      email: user_email,
      user_name: user_name,
      userId: userId,
      user_picture: user_picture
    }
    this.securityProvider.login_fb_service(login_fb)
      .subscribe(data => {
        var a = data;
		console.log(a);
        if (a.userdata) {
          var b = a.userdata;
          var c = b.email;
          localStorage['email'] = c;
          localStorage['user_id'] = b._id;
          localStorage['username'] = b.username;
           this.navCtrl.setRoot(TabsPage);
        }


      }),
      error => {
		   let alert = this.alertCtrl.create({
        title: this.translate.instant('popup.alert'),
        subTitle: JSON.stringify(error),
        buttons: [this.translate.instant('popup.ok')]
      });
      alert.present();
	  }
  }

}

