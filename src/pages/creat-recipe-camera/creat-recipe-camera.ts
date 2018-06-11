import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TabsPage } from '../tabs/tabs';
import { ImagePicker } from '@ionic-native/image-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
@IonicPage()
@Component({
  selector: 'page-creat-recipe-camera',
  templateUrl: 'creat-recipe-camera.html',
})




export class CreatRecipeCameraPage {
  Recipes;
  fruits = []
  ingredients_data
  instructions_data;
  category_name
  video
  recipe_id
  edit_recipe_data;
  loginform: FormGroup;
  pic = 'assets/imgs/add-profiler.png';
  pic1
  ppic;
  constructor( private translate: TranslateService,public modalCtrl: ModalController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, private imagePicker: ImagePicker, public alertCtrl: AlertController, public securityProvider: SecurityProvider, public actionSheetCtrl: ActionSheetController, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public viewCtrl: ViewController) {
    this.pic = this.navParams.get('pic1');
    this.pic1 = this.navParams.get('pic');
    this.ppic = this.navParams.get('ppic');

    this.Recipes = {}
    this.Recipes.recipeImages = this.navParams.get('orgPic')
    this.Recipes.ingredients = []
    this.Recipes.instructions = []
    this.Recipes.mainImage = 'assets/imgs/add-profiler.png';
    this.Recipes.email = localStorage['email']
    this.Recipes.userName = localStorage['username']
    this.Recipes.user_id = localStorage['user_id']
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRecipesPage');
  }

  onCamerapostRecipe() {
    var a = {
      email: localStorage['email'],
      userName: localStorage['username'],
      user_id: localStorage['user_id'],
      mainImage: this.Recipes.recipeImages
    }


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.addRecipes(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            var b = a.recipeData;
            this.recipe_id = b._id;
            let alert = this.alertCtrl.create({
              subTitle: this.translate.instant('popup.Post_successfully'),
              buttons: [this.translate.instant('popup.ok')]
            });
            alert.present();
            this.navCtrl.setRoot(TabsPage);
            this.addmyRecipe(this.recipe_id, localStorage['username']);

          } else {
            let alert = this.alertCtrl.create({
                 title: this.translate.instant('popup.tilte'),
                subTitle: this.translate.instant('popup.Something'),
                buttons: [this.translate.instant('popup.ok')]
            });
            alert.present();
          }

        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  onCameraPostCancel() {
    this.viewCtrl.dismiss();
  }

  onAttachedRecipe() {
    var a = "camera_post"
    this.navCtrl.push('MyRecipesPage', {
      camera_post: this.Recipes.recipeImages
    })
  }


  addmyRecipe(recipe_id, userName) {
    var add_rec = {
      recipe_id: recipe_id,
      user_id: localStorage['user_id']
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.AddtoMyRecipe(add_rec))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;

        }),
        error =>
        loading.dismiss().then(() => {

        })
      );

  }
  onIngredients(value) {
    this.Recipes.ingredientsValue = '';
    this.Recipes.ingredients.push(value);
    this.ingredients_data = this.Recipes.ingredients

  }
  remove_btn(index: any): void {
    let index1 = this.Recipes.ingredients.indexOf(index);
    this.Recipes.ingredients.splice(index1, 1);
  }
  onInstruction(value) {
    this.Recipes.instructionsValue = '';
    this.Recipes.instructions.push(value);
    this.instructions_data = this.Recipes.instructions
  }
  remove_instruction(index: any): void {
    let index1 = this.Recipes.instructions.indexOf(index);
    this.Recipes.instructions.splice(index1, 1);

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title:this.translate.instant('popup.tilte'),
      buttons: [{
          text: this.translate.instant('popup.Load_library'),
          handler: () => {
            this.fromgallery();
          }
        },
        {
          text: this.translate.instant('popup.use_camera'),
          handler: () => {
            this.fromcamera();
          }
        },
        {
          text:this.translate.instant('popup.Cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  fromgallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = 'data:image/jpeg;base64,' + imageData;
      this.Recipes.mainImage = base64Image;
      console.log(this.Recipes.mainImage);
    }, (err) => {
      console.log('gallery not working');
    })
  }


  fromcamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = 'data:image/jpeg;base64,' + imageData;
      this.Recipes.mainImage = base64Image;
      console.log(this.Recipes.mainImage);
    }, (err) => {
      console.log('camera not working');
    })
  }


  onMultiImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('popup.tilte'),
      buttons: [{
          text: this.translate.instant('popup.Load_library'),
          handler: () => {
            this.Multiimage();
          }
        },
        {
          text:  this.translate.instant('popup.use_camera'),
          handler: () => {
            this.multifromcamera();
          }
        },
        {
          text: this.translate.instant('popup.Cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  Multiimage() {
    var options = {
      width: 800,
      height: 800,
      quality: 75,
      outputType: 1,
      maximumImagesCount: 3
    };
    this.imagePicker.getPictures(options).then((results) => {
      let a = results.length;
      this.Recipes.recipeImages = results;
    }, (err) => {});
  }

  multifromgallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      let base64Image = imageData;
    }, (err) => {
      console.log('Gallery is not Working')
    })
  }


  multifromcamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      let base64Image = imageData;
    }, (err) => {
      console.log('Camera is not Working')
    })
  }

  onVideo() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

    }
    this.camera.getPicture(options).then((videoData) => {
      this.video = videoData;
    }, (err) => {
    });
  }

  onSave() {
    let mandatoryfields: string[] = [];
    if (this.Recipes.mainImage == 'assets/imgs/add-profiler.png') {
      mandatoryfields.push('Please upload main image ')
    }
    if (mandatoryfields.length > 0) {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: mandatoryfields.join(','),
        buttons: ['OK']
      });
      alert.present();
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      Observable.fromPromise(loading.present())
        .flatMap(data => this.securityProvider.addRecipes(this.Recipes))
        .subscribe(data =>
          loading.dismiss().then(() => {
            var a = data;

            if (a.success == true) {
              let alert = this.alertCtrl.create({
                subTitle: this.translate.instant('popup.recipe_added'),
                buttons: [this.translate.instant('popup.ok')]
              });
              alert.present();
              var b = a.recipeData;
              this.recipe_id = b._id;
              this.navCtrl.setRoot('MyRecipesPage');
            } else {
              let alert = this.alertCtrl.create({
                title: this.translate.instant('popup.tilte'),
                subTitle: this.translate.instant('popup.Something'),
                buttons: [this.translate.instant('popup.ok')]
              });
              alert.present();
            }
          }),
          error =>
          loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              title:this.translate.instant('popup.tilte'),
              subTitle: error,
              buttons: [this.translate.instant('popup.ok')]
            });
            alert.present();
          })
        );
    }

  }
  onCancel() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('popup.confirmation_recp'),
      buttons: [{
          text: this.translate.instant('popup.Cancel'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('popup.Cancel'),
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


}

