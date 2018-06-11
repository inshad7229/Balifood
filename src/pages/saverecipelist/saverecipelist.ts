import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
@IonicPage()
@Component({
  selector: 'page-saverecipelist',
  templateUrl: 'saverecipelist.html',
})
export class SaverecipelistPage {
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
  constructor(public translateService:TranslateService,public navCtrl: NavController, public navParams: NavParams) {
    this.list='true'
     this.pop_div='false';
     this.post=this.navParams.get('post');
     var a=this.navParams.get('savedetail');
     console.log("g"+JSON.stringify(this.savedetail));
       let data=a.filter(arg=>arg.recipe_detail!=null);
     if (data.length>0) {
       this.savedetail=data;
          this.savedetail2=data;

     }
     
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
