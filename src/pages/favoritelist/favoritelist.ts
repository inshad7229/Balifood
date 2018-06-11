import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-favoritelist',
  templateUrl: 'favoritelist.html',
})
export class FavoritelistPage {
Category;
Category2
cat;
list;
pop_div;
mycategory_data;
count=0;
savelength
post;
savedetail
savedetail2
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.list='true'
     this.pop_div='false';
     this.post=this.navParams.get('post');
     this.savedetail=this.navParams.get('savedetail');
     this.savedetail2=this.navParams.get('savedetail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaverecipelistPage');
  }
  onNewRecipe(){
     this.pop_div='false';
    this.navCtrl.push('NewRecipesPage');
  }
onIconlist(){
    this.list='false'
}
onIcongrid(){
     this.list='true'
}

 onViewDetail(recipe_id,recipe_data){
    this.pop_div='false';
           this.navCtrl.push('SaveRecipeDetailPage',{recipe_data:recipe_data,post:this.post});
     
    }
}
