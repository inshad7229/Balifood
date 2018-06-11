import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the LevelpopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-levelpopover',
  templateUrl: 'levelpopover.html',
}) 
export class LevelpopoverPage {
relationship
  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController,public viewCtrl: ViewController) {
 this.relationship='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelpopoverPage');
  }

  close(){

 this.viewCtrl.dismiss('NewRecipesPage');

  }
}
