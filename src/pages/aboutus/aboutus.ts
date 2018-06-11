import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";

/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
about
  constructor(public navCtrl: NavController, public navParams: NavParams, public securityProvider: SecurityProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }
  ngOnInit() {
    this.securityProvider.AboutUsBalifood()
      .subscribe(data => {
      	var a=data.content;
      	this.about=data.content;
      	console.log(a);
      }),
      error => {}
  }
  getContent(a){
	  if(localStorage['language']=="heb"){
		  return a.contentHebrew
	  }else{
		  return a.content
	  }
  }
}
