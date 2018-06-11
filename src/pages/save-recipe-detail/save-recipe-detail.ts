import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-save-recipe-detail',
  templateUrl: 'save-recipe-detail.html',
})
export class SaveRecipeDetailPage {
  recipe_data
  mainImage
  recipeTitle
  views
  likes
  mealType
  duration
  level
  description
  instructions
  ingredients
  ingredientss=[]
  categories
  email
  userName
  instructionss=[]
  img;
  recipe_id;
  a
   cook:boolean
  imgb
  recipeImages
  post
  status
  constructor(public translateService:TranslateService,public loadingCtrl: LoadingController, private socialSharing: SocialSharing, public alertCtrl: AlertController, public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {
	    this.cook=false;
    this.img = [{
        img: "./assets/imgs/korean.jpg"
      },
      {
        img: "./assets/imgs/images.jpg"
      },
      {
        img: "./assets/imgs/Bebek-and-Ayam-Betutu.jpg"
      },
      {
        img: "./assets/imgs/balifood1.jpg"
      },
      {
        img: "./assets/imgs/korean.jpg"
      }
    ]
    this.recipe_data = this.navParams.get('recipe_data');
    this.post = this.navParams.get('post');
    console.log("a" + JSON.stringify(this.recipe_data));
    if (this.recipe_data) {
      this.mainImage = this.recipe_data.mainImage
      this.recipeTitle = this.recipe_data.recipeTitle;
      this.views = this.recipe_data.views.length;
      this.likes = this.recipe_data.likes.length;
      this.mealType = this.recipe_data.mealType;
      this.duration = this.recipe_data.duration;
      this.level = this.recipe_data.level;
      this.description = this.recipe_data.description;
     this.ingredients = this.recipe_data.ingredients;
     this.instructions = this.recipe_data.instructions;
	 this.a = {}
      for (var i = 0; i < this.ingredients.length; i++) {
        this.ingredientss.push({ing:this.ingredients[i],checkStatus:false})
      };

       for (var i = 0; i < this.instructions.length; i++) {
        this.instructionss.push({ins:this.instructions[i],checkStatus:false})
      };
      this.categories = this.recipe_data.categories;
      this.email = this.recipe_data.email;
      this.recipe_id = this.recipe_data._id;
      this.status=this.recipe_data.status;
      this.recipeImages = this.recipe_data.recipeImages;
      if (localStorage['email'] != this.email) {
        this.userName = this.recipe_data.userName;
      }
     

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRecipesPage');

  }

    onPosted() {
    var recipe_id = this.recipe_id;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.postRecipe(recipe_id))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Post_successfully'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            this.navCtrl.setRoot('MainPage');
          } else {
            let alert = this.alertCtrl.create({
               title: this.translateService.instant('popup.tilte'),
                subTitle: this.translateService.instant('popup.Something'),
                buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          }
        }),
        error =>
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            title: 'Alert!',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        })
      );
  }
  onImage(img) {
    this.mainImage = img;
  }
  onSave() {
    var a = {
      recipe_id: this.recipe_id,
      user_id: localStorage['user_id']
    }
    this.securityProvider.AddtoMyRecipe(a)
      .subscribe(data => {
        var a = data;
        if (a.message == "Data Saved") {
          let alert = this.alertCtrl.create({
            title: this.translateService.instant('popup.tilte'),
            subTitle: this.translateService.instant('popup.saved_from') + this.userName,
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: this.translateService.instant('popup.tilte'),
            subTitle:this.translateService.instant('popup.deleted_saved'),
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        }
        console.log("data" + JSON.stringify(data));
      }),
      error => {}
  }


  onLike() {
    var a = {
      recipe_id: this.recipe_id,
      user_id: localStorage['user_id']
    }

    this.securityProvider.Likes(a)
      .subscribe(data => {
        console.log('like_data' + JSON.stringify(data));
      }),
      error => {}
  }

  share() {
    var message = 'Shared by baliFood App';
    var subject = this.recipeTitle;
    var file = this.mainImage;
    var url = "http://google.com";
    this.socialSharing.share(message, subject, file, url).then((data) => {

    }).catch((error) => {});
  }
  cookmode1(){
    this.cook=!this.cook;
  }
  cookmode(){
    this.cook=!this.cook;
  }
   onCookeding(index){
    if(this.cook){
      this.ingredientss[index].checkStatus=!this.ingredientss[index].checkStatus;
    }
  }
   onCookedins(index){
    if(this.cook){
       this.instructionss[index].checkStatus=!this.instructionss[index].checkStatus;
    }
  }
  onPost() {
    var recipe_id = this.recipe_id;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.postRecipe(recipe_id))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.recipe_added'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            this.navCtrl.setRoot('MainPage');
          } else {
            let alert = this.alertCtrl.create({
                 title: this.translateService.instant('popup.tilte'),
                subTitle: this.translateService.instant('popup.Something'),
                buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          }
        }),
        error =>
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            title: this.translateService.instant('popup.title'),
            subTitle: error,
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        })
      );
  }
    deleteRecipe(){
     var a=this.recipe_id
      this.securityProvider.deleteRecipe(a)
      .subscribe(data => {
        var a=data;
        console.log('delete_data' + JSON.stringify(data));
        if(a.success=='true' ||a.success==true){
          
          let alert = this.alertCtrl.create({
            subTitle: this.translateService.instant('popup.data_deleted'),
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
          this.navCtrl.pop();
        }
          else{
          let alert = this.alertCtrl.create({
            subTitle: a.msg,
            buttons: ['OK']
          });
          alert.present();
        }
      }),
      error => {}
  }
  ondeleteRecipe(){
    let confirm = this.alertCtrl.create({
      title: this.translateService.instant('popup.title'),
      message:this.translateService.instant('popup.delete_recipe_con'),
      buttons: [
        {
          text: this.translateService.instant('popup.no'),
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.translateService.instant('popup.yes'),
          handler: () => {
            console.log('Agree clicked');
            this.deleteRecipe()
          }
        }
      ]
    });
    confirm.present();
   
  }
  
  onEditRecipe(){
    this.navCtrl.push('NewRecipesPage',{edit_recipe_data:this.recipe_data})
  }
}

