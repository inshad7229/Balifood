var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TabsPage } from '../tabs/tabs';
import { ImagePicker } from '@ionic-native/image-picker';
import { FormBuilder } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
var CreatRecipeCameraPage = /** @class */ (function () {
    function CreatRecipeCameraPage(translate, modalCtrl, loadingCtrl, formBuilder, imagePicker, alertCtrl, securityProvider, actionSheetCtrl, camera, navCtrl, navParams, popoverCtrl, viewCtrl) {
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.imagePicker = imagePicker;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.viewCtrl = viewCtrl;
        this.fruits = [];
        this.pic = 'assets/imgs/add-profiler.png';
        this.pic = this.navParams.get('pic1');
        this.pic1 = this.navParams.get('pic');
        this.ppic = this.navParams.get('ppic');
        this.Recipes = {};
        this.Recipes.recipeImages = this.navParams.get('orgPic');
        this.Recipes.ingredients = [];
        this.Recipes.instructions = [];
        this.Recipes.mainImage = 'assets/imgs/add-profiler.png';
        this.Recipes.email = localStorage['email'];
        this.Recipes.userName = localStorage['username'];
        this.Recipes.user_id = localStorage['user_id'];
    }
    CreatRecipeCameraPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CreatRecipeCameraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewRecipesPage');
    };
    CreatRecipeCameraPage.prototype.onCamerapostRecipe = function () {
        var _this = this;
        var a = {
            email: localStorage['email'],
            userName: localStorage['username'],
            user_id: localStorage['user_id'],
            mainImage: this.Recipes.recipeImages
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.addRecipes(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var b = a.recipeData;
                    _this.recipe_id = b._id;
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: _this.translate.instant('popup.Post_successfully'),
                        buttons: [_this.translate.instant('popup.ok')]
                    });
                    alert_1.present();
                    _this.navCtrl.setRoot(TabsPage);
                    _this.addmyRecipe(_this.recipe_id, localStorage['username']);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: _this.translate.instant('popup.tilte'),
                        subTitle: _this.translate.instant('popup.Something'),
                        buttons: [_this.translate.instant('popup.ok')]
                    });
                    alert_2.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    CreatRecipeCameraPage.prototype.onCameraPostCancel = function () {
        this.viewCtrl.dismiss();
    };
    CreatRecipeCameraPage.prototype.onAttachedRecipe = function () {
        var a = "camera_post";
        this.navCtrl.push('MyRecipesPage', {
            camera_post: this.Recipes.recipeImages
        });
    };
    CreatRecipeCameraPage.prototype.addmyRecipe = function (recipe_id, userName) {
        var _this = this;
        var add_rec = {
            recipe_id: recipe_id,
            user_id: localStorage['user_id']
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.AddtoMyRecipe(add_rec); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    CreatRecipeCameraPage.prototype.onIngredients = function (value) {
        this.Recipes.ingredientsValue = '';
        this.Recipes.ingredients.push(value);
        this.ingredients_data = this.Recipes.ingredients;
    };
    CreatRecipeCameraPage.prototype.remove_btn = function (index) {
        var index1 = this.Recipes.ingredients.indexOf(index);
        this.Recipes.ingredients.splice(index1, 1);
    };
    CreatRecipeCameraPage.prototype.onInstruction = function (value) {
        this.Recipes.instructionsValue = '';
        this.Recipes.instructions.push(value);
        this.instructions_data = this.Recipes.instructions;
    };
    CreatRecipeCameraPage.prototype.remove_instruction = function (index) {
        var index1 = this.Recipes.instructions.indexOf(index);
        this.Recipes.instructions.splice(index1, 1);
    };
    CreatRecipeCameraPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translate.instant('popup.tilte'),
            buttons: [{
                    text: this.translate.instant('popup.Load_library'),
                    handler: function () {
                        _this.fromgallery();
                    }
                },
                {
                    text: this.translate.instant('popup.use_camera'),
                    handler: function () {
                        _this.fromcamera();
                    }
                },
                {
                    text: this.translate.instant('popup.Cancel'),
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    CreatRecipeCameraPage.prototype.fromgallery = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
            _this.Recipes.mainImage = base64Image;
            console.log(_this.Recipes.mainImage);
        }, function (err) {
            console.log('gallery not working');
        });
    };
    CreatRecipeCameraPage.prototype.fromcamera = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
            _this.Recipes.mainImage = base64Image;
            console.log(_this.Recipes.mainImage);
        }, function (err) {
            console.log('camera not working');
        });
    };
    CreatRecipeCameraPage.prototype.onMultiImg = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translate.instant('popup.tilte'),
            buttons: [{
                    text: this.translate.instant('popup.Load_library'),
                    handler: function () {
                        _this.Multiimage();
                    }
                },
                {
                    text: this.translate.instant('popup.use_camera'),
                    handler: function () {
                        _this.multifromcamera();
                    }
                },
                {
                    text: this.translate.instant('popup.Cancel'),
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    CreatRecipeCameraPage.prototype.Multiimage = function () {
        var _this = this;
        var options = {
            width: 800,
            height: 800,
            quality: 75,
            outputType: 1,
            maximumImagesCount: 3
        };
        this.imagePicker.getPictures(options).then(function (results) {
            var a = results.length;
            _this.Recipes.recipeImages = results;
        }, function (err) { });
    };
    CreatRecipeCameraPage.prototype.multifromgallery = function () {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        }).then(function (imageData) {
            var base64Image = imageData;
        }, function (err) {
            console.log('Gallery is not Working');
        });
    };
    CreatRecipeCameraPage.prototype.multifromcamera = function () {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        }).then(function (imageData) {
            var base64Image = imageData;
        }, function (err) {
            console.log('Camera is not Working');
        });
    };
    CreatRecipeCameraPage.prototype.onVideo = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            mediaType: this.camera.MediaType.VIDEO,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        };
        this.camera.getPicture(options).then(function (videoData) {
            _this.video = videoData;
        }, function (err) {
        });
    };
    CreatRecipeCameraPage.prototype.onSave = function () {
        var _this = this;
        var mandatoryfields = [];
        if (this.Recipes.mainImage == 'assets/imgs/add-profiler.png') {
            mandatoryfields.push('Please upload main image ');
        }
        if (mandatoryfields.length > 0) {
            var alert_3 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: mandatoryfields.join(','),
                buttons: ['OK']
            });
            alert_3.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.addRecipes(_this.Recipes); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var alert_4 = _this.alertCtrl.create({
                            subTitle: _this.translate.instant('popup.recipe_added'),
                            buttons: [_this.translate.instant('popup.ok')]
                        });
                        alert_4.present();
                        var b = a.recipeData;
                        _this.recipe_id = b._id;
                        _this.navCtrl.setRoot('MyRecipesPage');
                    }
                    else {
                        var alert_5 = _this.alertCtrl.create({
                            title: _this.translate.instant('popup.tilte'),
                            subTitle: _this.translate.instant('popup.Something'),
                            buttons: [_this.translate.instant('popup.ok')]
                        });
                        alert_5.present();
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: _this.translate.instant('popup.tilte'),
                        subTitle: error,
                        buttons: [_this.translate.instant('popup.ok')]
                    });
                    alert.present();
                });
            });
        }
    };
    CreatRecipeCameraPage.prototype.onCancel = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.translate.instant('popup.confirmation_recp'),
            buttons: [{
                    text: this.translate.instant('popup.Cancel'),
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.translate.instant('popup.Cancel'),
                    handler: function () {
                        console.log('Yes clicked');
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    CreatRecipeCameraPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-creat-recipe-camera',
            templateUrl: 'creat-recipe-camera.html',
        }),
        __metadata("design:paramtypes", [TranslateService, ModalController, LoadingController, FormBuilder, ImagePicker, AlertController, SecurityProvider, ActionSheetController, Camera, NavController, NavParams, PopoverController, ViewController])
    ], CreatRecipeCameraPage);
    return CreatRecipeCameraPage;
}());
export { CreatRecipeCameraPage };
//# sourceMappingURL=creat-recipe-camera.js.map