import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
login
resend_btn
salonregister:FormGroup;
  constructor(public translateService:TranslateService,public alertCtrl: AlertController,public formBuilder: FormBuilder,public securityProvider:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
 this.resend_btn='false';
 this.login={}
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.salonregister = formBuilder.group({
        useremail: ['', Validators.compose([ 
            Validators.pattern(emailRegex), Validators.required])]
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

    onSend(){
      this.securityProvider.forgot(this.login)
         .subscribe(data  =>{ 
          console.log("data"+JSON.stringify(data));
            var a=data;
            if(a.success==true){
               	this.resend_btn='true';
                let alert = this.alertCtrl.create({
                    subTitle: this.translateService.instant('popup.'+a.message),
                    buttons: [this.translateService.instant('popup.ok')]
                });
                alert.present();
           }else{
                this.resend_btn='false';
                let alert = this.alertCtrl.create({
                    subTitle: this.translateService.instant('popup.'+a.message),
                    buttons: [this.translateService.instant('popup.ok')]
                });
                alert.present();
            }
        }),
        error  => {}
    }

    onLogin(){
    	this.navCtrl.push('LoginPage');
    }
}
