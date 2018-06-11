import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

/**
 * Generated class for the MyrecipesideiconPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myrecipesideicon',
  templateUrl: 'myrecipesideicon.html',
})
export class MyrecipesideiconPage {

  constructor(public translateService:TranslateService,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyrecipesideiconPage');
  }

close() {
    this.viewCtrl.dismiss();
  }
  myrecipe(){
  	this.navCtrl.push('NewRecipesPage');
  }
}
