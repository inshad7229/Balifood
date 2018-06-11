import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
@IonicPage()
@Component({
  selector: 'page-fridgesearch',
  templateUrl: 'fridgesearch.html',
})
export class FridgesearchPage {
recipedata;
recipedata2;
offsetData=0;
  constructor(public alertCtrl:AlertController, public securityProvider: SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FridgesearchPage');
  }
 ngOnInit() {
    this.securityProvider.MainRecipe(this.offsetData)
      .subscribe(data => {
        this.recipedata = data.Recipes;
         this.recipedata2 = data.Recipes;
        for (var i = 0; i < this.recipedata.length; i++) {
        	var a=this.recipedata[i];

        }
      }),
      error => {
        if (error) {
        }
      }
  }
  
  getItems(ev: any) {
    var val = ev.target.value;

    if (val && val.trim() != '') {

      this.recipedata = this.recipedata.filter((p) => {
        if (p.recipeTitle) {
          return (p.recipeTitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    } else {
      this.recipedata = this.recipedata2;
    }
  }
}
