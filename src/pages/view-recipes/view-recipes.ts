import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from "@ngx-translate/core";
import {
    DomSanitizer
} from "@angular/platform-browser";
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


@IonicPage()
@Component({
  selector: 'page-view-recipes',
  templateUrl: 'view-recipes.html',
})


export class ViewRecipesPage {
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
  instructionss=[]
  ingredients
  ingredientss=[]
  categories
  email
  userName
  img;
  recipe_id;
  a
  imgb
  recipeImages
  post
  status
  cook:boolean
  index
  camera_post
  videoUrl
  constructor(public translateService:TranslateService,private streamingMedia: StreamingMedia,private domSanitizer: DomSanitizer,public loadingCtrl: LoadingController, private socialSharing: SocialSharing, public alertCtrl: AlertController, public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {
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
    this.camera_post=this.navParams.get('camera_post')
    console.log("recipe_data"+JSON.stringify(this.recipe_data));
    this.post = this.navParams.get('post');
    if (this.recipe_data) {
      this.mainImage = this.recipe_data.mainImage;
      this.videoUrl=this.recipe_data.videoUrl;
      this.recipeTitle = this.recipe_data.recipeTitle;
      if( this.recipe_data.views){
        this.views = this.recipe_data.views.length;
      this.likes = this.recipe_data.likes.length;
      }
      this.mealType = this.recipe_data.mealType;
      this.duration = this.recipe_data.duration;
      this.level = this.recipe_data.level;
      this.description = this.recipe_data.description;
      this.ingredients = this.recipe_data.ingredients;
      this.instructions = this.recipe_data.instructions;
      this.categories = this.recipe_data.categories;
      this.email = this.recipe_data.email;
      this.recipe_id = this.recipe_data._id;
      this.status=this.recipe_data.status;
      this.recipeImages = this.recipe_data.recipeImages;
      if (localStorage['email'] != this.email) {
        this.userName = this.recipe_data.userName;
      }
      this.a = {}
      for (var i = 0; i < this.ingredients.length; i++) {
        this.ingredientss.push({ing:this.ingredients[i],checkStatus:false})
      };

       for (var i = 0; i < this.instructions.length; i++) {
        this.instructionss.push({ins:this.instructions[i],checkStatus:false})
      };

    }
  }
      playvideo1(url){
      let options: StreamingVideoOptions = {
  successCallback: () => { console.log('Video played') },
  errorCallback: (e) => { console.log('Error streaming') },
};

this.streamingMedia.playVideo(url, options);
    }
  getSafeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRecipesPage');

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
            title:  this.translateService.instant('popup.Recipe_saved'),
            subTitle: this.translateService.instant('popup.This_recipe_is_saved_from') + this.userName,
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title:  this.translateService.instant('popup.Recipe_delete'),
            subTitle:this.translateService.instant('popup.Recipe_deleted_save'),
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

  ondeleteRecipe(){
    let confirm = this.alertCtrl.create({
      title: this.translateService.instant('popup.title'),
      message: this.translateService.instant('popup.delete_recipe_con'),
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
  deleteRecipe(){
     var a=this.recipe_id
      this.securityProvider.deleteRecipe(a)
      .subscribe(data => {
        var a=data;
        console.log('delete_data' + JSON.stringify(data));
        if(a.success=='true' ||a.success==true){
          
          let alert = this.alertCtrl.create({
            subTitle: this.translateService.instant('popup.Recipe_deleted_successfully'),
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
          this.navCtrl.setRoot(TabsPage);
        }
          else{
          let alert = this.alertCtrl.create({
            subTitle: a.msg,
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        }
      }),
      error => {}
  }

  share() {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

  loading.present();
    var message = 'Shared by baliFood App';
    var subject = this.recipeTitle;
    var file = this.mainImage;
    var url = "http://google.com";
    this.socialSharing.share(message, subject, file, url).then((data) => {
      loading.dismiss();

    }).catch((error) => {
      loading.dismiss();
    });
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
              subTitle:this.translateService.instant('popup.Post_successfully1'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            this.navCtrl.setRoot('MainPage');
          } else {
            let alert = this.alertCtrl.create({
              title: this.translateService.instant('popup.title'),
              subTitle:this.translateService.instant('popup.Something'),
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

  onEditRecipe(){
    this.navCtrl.push('NewRecipesPage',{edit_recipe_data:this.recipe_data})
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
onattchedRecipe(){
   var recipe_id = this.recipe_id;
   var a={
     recipe_id: this.recipe_id,
     recipeImage:this.camera_post
   }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.attachedRecipe(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
    message: this.translateService.instant('popup.Doyouwant'),
    buttons: [
      {
        text: this.translateService.instant('popup.cancel'),
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: this.translateService.instant('popup.yes'),
        handler: () => {
          console.log('Buy clicked');
          this.Confirm_post(this.recipe_id)
        }
      }
    ]
  });
  alert.present();
          this.camera_post='';
          var a = data;
          if(a.data){
            var b=a.data;
            this.mainImage = b.mainImage
      this.recipeTitle = b.recipeTitle;
      if( b.views){
        this.views = b.views.length;
      this.likes = b.likes.length;
      }
      this.mealType = b.mealType;
      this.duration = b.duration;
      this.level = b.level;
      this.description = b.description;
      this.ingredients = b.ingredients;
      this.instructions = b.instructions;
      this.categories = b.categories;
      this.email = b.email;
      this.recipe_id = b._id;
      this.status=b.status;
      this.recipeImages = b.recipeImages;
      if (localStorage['email'] != this.email) {
        this.userName = b.userName;
      }
      this.a = {}
      for (var i = 0; i < this.ingredients.length; i++) {
        this.ingredientss.push({ing:this.ingredients[i],checkStatus:false})
      };

       for (var i = 0; i < this.instructions.length; i++) {
        this.instructionss.push({ins:this.instructions[i],checkStatus:false})
      };
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


Confirm_post(recipe_id) {
 var recipe_id = recipe_id;

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
              title: this.translateService.instant('popup.title'),
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

}

