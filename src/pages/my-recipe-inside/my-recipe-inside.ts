import { Component } from '@angular/core';
import { NavController, IonicPage  ,NavParams,ActionSheetController,AlertController,LoadingController,ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-my-recipe-inside',
  templateUrl: 'my-recipe-inside.html',
})
export class MyRecipeInsidePage {
recipes_data
category
list
pop_div;
count=0;
cat
post
fav_status
camera_post
myfavRecipe
pic
Recipes
urltext
addurlvalue:boolean;
RecipeLink
Menu
checkStatus
Recipe_id
eventType
eventData
menu_data
  constructor(public translateService:TranslateService,public viewCtrl:ViewController, public loadingCtrl: LoadingController,public modalCtrl: ModalController,private camera: Camera,public actionSheetCtrl:ActionSheetController, public securityProvider:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
 this.recipes_data=this.navParams.get('recipes_data');
 this.category=this.recipes_data.categoryData;
 this.cat=this.recipes_data.categoryData;
 this.eventType=this.navParams.get('eventType');
 //JSON.stringify(this.navParams);
      this.addurlvalue=false;
  this.list='true';
      this.pop_div='false';
      this.post=this.navParams.get('post');
      this.camera_post=this.navParams.get('camera_post');
      this.RecipeLink=this.navParams.get('RecipeLink');
      this.Menu=this.navParams.get('Menu');
           this.eventData=this.navParams.get('eventData')
     this.menu_data=this.navParams.get('menu_data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRecipeInsidePage');
  }
  ngOnInit(){
this.getfav_sav_Status()
  }
    getfav_sav_Status(){
           var a=localStorage['user_id']
      this.securityProvider.get_status(a)
         .subscribe(data  =>{ 
           var a=data.myRecipes;
           this.myfavRecipe=data.favouriteRecipes
          console.log('get_status'+JSON.stringify(a))
        }),
        error  => {}
    }

      getStatusFOrdisabled(id){
      let data=this.myfavRecipe.filter(arg=>arg.recipe_id==id)
      if (data.length>0) {
        return true
      }else{
        return false
      }
    }


onIconlist(){
    this.list='false'
}
onIcongrid(){
     this.list='true'
}
 onNewRecipe(){
  this.pop_div='false';
    this.navCtrl.push('NewRecipesPage',{insidecategory:this.recipes_data.category});
  }
presentPopover(){
  this.count++;
  if(this.count%2!=0){
   this.pop_div='true'; 
  }
   else{
     this.pop_div='false'; 
   }
  }

    getItems(ev: any) {
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.category= this.category.filter((p) => {
                return (p.recipeTitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
             this.category  = this.cat;
             
        }
    }
   onViewDetail(recipe_id,recipe_data){
    this.pop_div='false';
           this.navCtrl.push('ViewRecipesPage',{recipe_data:recipe_data,post:this.post, camera_post: this.camera_post});
     
    }
    onAddFavourite(recipe_id){
      var a={
          user_id:localStorage['user_id'],
          recipe_id:recipe_id
      }
           this.securityProvider.addFav(a)
         .subscribe(data  =>{ 
           console.log("Add_fav_data"+JSON.stringify(data));
           var a=data;
            this.getfav_sav_Status();
           if(a.message=="recipe added to favourite list"){
             let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Recipe_added_fav'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
           
           }
           else{
            let alert = this.alertCtrl.create({
              subTitle:this.translateService.instant('popup.Recipe_rmv_fav'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
           }
        }),
        error  => {}
    }
onImports(){
  let actionSheet = this.actionSheetCtrl.create({
      title: this.translateService.instant('popup.Select_Image'),
      buttons: [{
          text: this.translateService.instant('popup.Load_library'),
          handler: () => {
            this.fromgallery();
            this.pop_div=false;
          }
        },
        {
          text:this.translateService.instant('popup.use_camera'),
          handler: () => {
            this.fromcamera();
             this.pop_div=false;
          }
        },
        {
          text: this.translateService.instant('popup.Cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
}

fromcamera(){
 this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
      //allowEdit:true
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = 'data:image/jpeg;base64,' + imageData;
          let modal = this.modalCtrl.create('ImportRecipeImagePage',{pic:this.pic,mainImage:imageData});
    modal.present();
      console.log(this.Recipes.mainImage);
    }, (err) => {
      console.log('camera not working');
    })
}

fromgallery(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
     // allowEdit:true
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = 'data:image/jpeg;base64,' + imageData;
       let modal = this.modalCtrl.create('ImportRecipeImagePage',{pic:this.pic,mainImage:imageData});
    modal.present();
      console.log(this.Recipes.mainImage);
    }, (err) => {
      console.log('gallery not working');
    })
}
  
  AddUrl(){
  this.pop_div='false';
  this.addurlvalue=true;
}
onRecipeTextAdd(){
      var a = {
      url: this.urltext
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.AddUrl(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          console.log("data"+JSON.stringify(data));
          this.addurlvalue=false;
          var a=data;
          var b=a.data
          if(a.success==true){
            this.urltext='';
            this.navCtrl.push('ImportRecipeUrlPage',{ImportUrlData:b});
          }
        }),
        error =>
        loading.dismiss().then(() => {
          console.log("err"+JSON.stringify(error));
          this.addurlvalue=false;
        })
      );
}
onCancel(){
  this.addurlvalue=false;
}
onAttachedRecipeLink(){
  if (this.menu_data) {
	 // alert(this.Recipe_id);
    this.navCtrl.push('EditEventMenuItemFormPage',{editEvent:'editEvent',eventData:this.eventData,Menuitem:this.Menu,Recipe_id:this.Recipe_id,eventType:this.eventType,menu_data:this.menu_data})
  }
  else{
	  
    if (this.eventType) {
   this.navCtrl.push('CreatenewmenuitemsformPage',{Menuitem:this.Menu,Recipe_id:this.Recipe_id,eventType:this.eventType})
  }
  else{
	  
 this.navCtrl.push('CreatenewmenuitemsformPage',{Menuitem:this.Menu,Recipe_id:this.Recipe_id})
  }
  }
  
}
  onCheckRecipe(recipe_id,recipe_name,index){
	//alert(JSON.stringify(this.Menu));
   this.checkStatus=index;
   this.Menu.recipe_name=recipe_name;
   this.Menu.Recipe_id=recipe_id;

  }
}
