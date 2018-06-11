import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-notification-setting',
  templateUrl: 'notification-setting.html',
})
export class NotificationSettingPage {

  constructor(public translateService:TranslateService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationSettingPage');
  }

}
