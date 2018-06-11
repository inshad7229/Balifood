import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';

@IonicPage()
@Component({
  selector: 'page-account-my-post',
  templateUrl: 'account-my-post.html',
})


export class AccountMyPostPage {
  dataa
  listclass
  user_id
  list
  user_email
  mydata
  offsetData=0;
  constructor(public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.listclass = 'list-view';
    this.list = 'true';
    this.user_id = localStorage['user_id'];
    this.user_email = localStorage['email']
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountMyPostPage');
  }
  ngOnInit() {
    this.securityProvider.MainRecipe(this.offsetData)
      .subscribe(data => {
        this.dataa = data.Recipes;
        this.getStatusFOrdisabled();
      }),
      error => {}
  }

  onIconlist() {
    this.listclass = 'grid-view';
    this.list = 'false'
  }
  onIcongrid() {
    this.listclass = 'list-view';
    this.list = 'true'
  }
  getStatusFOrdisabled() {
    let data = this.dataa.filter(arg => this.user_id == arg.user_id && arg.categories != "Others");
    if (data.length > 0) {
      this.mydata = data;
      console.log("mydata" + JSON.stringify(this.mydata));
    } else {
      console.log("data1" + JSON.stringify(data));
    }
  }

  onViewDetail(recipe_id, recipe_data) {
    this.navCtrl.push('ViewRecipesPage', {
      recipe_data: recipe_data
    });
    console.log("recipe_data" + JSON.stringify(recipe_data));
    var a = {
      recipe_id: recipe_id,
      user_id: localStorage['user_id']
    }

    this.securityProvider.View_detail(a)
      .subscribe(data => {
        console.log('View_data' + JSON.stringify(data));
        this.ngOnInit();

      }),
      error => {}
  }

}

