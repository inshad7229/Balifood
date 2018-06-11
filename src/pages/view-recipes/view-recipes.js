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
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TabsPage } from '../tabs/tabs';
import { DomSanitizer } from "@angular/platform-browser";
import { StreamingMedia } from '@ionic-native/streaming-media';
var ViewRecipesPage = /** @class */ (function () {
    function ViewRecipesPage(streamingMedia, domSanitizer, loadingCtrl, socialSharing, alertCtrl, securityProvider, navCtrl, navParams) {
        this.streamingMedia = streamingMedia;
        this.domSanitizer = domSanitizer;
        this.loadingCtrl = loadingCtrl;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.instructionss = [];
        this.ingredientss = [];
        this.cook = false;
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
        ];
        this.recipe_data = this.navParams.get('recipe_data');
        this.camera_post = this.navParams.get('camera_post');
        console.log("recipe_data" + JSON.stringify(this.recipe_data));
        this.post = this.navParams.get('post');
        if (this.recipe_data) {
            this.mainImage = this.recipe_data.mainImage;
            this.videoUrl = this.recipe_data.videoUrl;
            this.recipeTitle = this.recipe_data.recipeTitle;
            if (this.recipe_data.views) {
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
            this.status = this.recipe_data.status;
            this.recipeImages = this.recipe_data.recipeImages;
            if (localStorage['email'] != this.email) {
                this.userName = this.recipe_data.userName;
            }
            this.a = {};
            for (var i = 0; i < this.ingredients.length; i++) {
                this.ingredientss.push({ ing: this.ingredients[i], checkStatus: false });
            }
            ;
            for (var i = 0; i < this.instructions.length; i++) {
                this.instructionss.push({ ins: this.instructions[i], checkStatus: false });
            }
            ;
        }
    }
    ViewRecipesPage.prototype.playvideo1 = function (url) {
        var options = {
            successCallback: function () { console.log('Video played'); },
            errorCallback: function (e) { console.log('Error streaming'); },
        };
        this.streamingMedia.playVideo(url, options);
    };
    ViewRecipesPage.prototype.getSafeUrl = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    ViewRecipesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewRecipesPage');
    };
    ViewRecipesPage.prototype.onImage = function (img) {
        this.mainImage = img;
    };
    ViewRecipesPage.prototype.onSave = function () {
        var _this = this;
        var a = {
            recipe_id: this.recipe_id,
            user_id: localStorage['user_id']
        };
        this.securityProvider.AddtoMyRecipe(a)
            .subscribe(function (data) {
            var a = data;
            if (a.message == "Data Saved") {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Recipe saved!',
                    subTitle: 'This recipe is saved from ' + _this.userName,
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Recipe deleted!',
                    subTitle: 'This recipe is deleted from your saved list.',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            console.log("data" + JSON.stringify(data));
        }),
            function (error) { };
    };
    ViewRecipesPage.prototype.onLike = function () {
        var a = {
            recipe_id: this.recipe_id,
            user_id: localStorage['user_id']
        };
        this.securityProvider.Likes(a)
            .subscribe(function (data) {
            console.log('like_data' + JSON.stringify(data));
        }),
            function (error) { };
    };
    ViewRecipesPage.prototype.ondeleteRecipe = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Alert',
            message: 'Do you want to delete recipe?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.deleteRecipe();
                    }
                }
            ]
        });
        confirm.present();
    };
    ViewRecipesPage.prototype.deleteRecipe = function () {
        var _this = this;
        var a = this.recipe_id;
        this.securityProvider.deleteRecipe(a)
            .subscribe(function (data) {
            var a = data;
            console.log('delete_data' + JSON.stringify(data));
            if (a.success == 'true' || a.success == true) {
                var alert_3 = _this.alertCtrl.create({
                    subTitle: 'Recipe deleted successfully',
                    buttons: ['OK']
                });
                alert_3.present();
                _this.navCtrl.setRoot(TabsPage);
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    subTitle: a.msg,
                    buttons: ['OK']
                });
                alert_4.present();
            }
        }),
            function (error) { };
    };
    ViewRecipesPage.prototype.share = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var message = 'Shared by baliFood App';
        var subject = this.recipeTitle;
        var file = this.mainImage;
        var url = "http://google.com";
        this.socialSharing.share(message, subject, file, url).then(function (data) {
            loading.dismiss();
        }).catch(function (error) {
            loading.dismiss();
        });
    };
    ViewRecipesPage.prototype.onPost = function () {
        var _this = this;
        var recipe_id = this.recipe_id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.postRecipe(recipe_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_5 = _this.alertCtrl.create({
                        subTitle: 'Post successfully!',
                        buttons: ['OK']
                    });
                    alert_5.present();
                    _this.navCtrl.setRoot('MainPage');
                }
                else {
                    var alert_6 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Something went wrong!',
                        buttons: ['OK']
                    });
                    alert_6.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    ViewRecipesPage.prototype.onEditRecipe = function () {
        this.navCtrl.push('NewRecipesPage', { edit_recipe_data: this.recipe_data });
    };
    ViewRecipesPage.prototype.cookmode1 = function () {
        this.cook = !this.cook;
    };
    ViewRecipesPage.prototype.cookmode = function () {
        this.cook = !this.cook;
    };
    ViewRecipesPage.prototype.onCookeding = function (index) {
        if (this.cook) {
            this.ingredientss[index].checkStatus = !this.ingredientss[index].checkStatus;
        }
    };
    ViewRecipesPage.prototype.onCookedins = function (index) {
        if (this.cook) {
            this.instructionss[index].checkStatus = !this.instructionss[index].checkStatus;
        }
    };
    ViewRecipesPage.prototype.onattchedRecipe = function () {
        var _this = this;
        var recipe_id = this.recipe_id;
        var a = {
            recipe_id: this.recipe_id,
            recipeImage: this.camera_post
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.attachedRecipe(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    message: 'Do you want to post this recipe?',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: 'Yes',
                            handler: function () {
                                console.log('Buy clicked');
                                _this.Confirm_post(_this.recipe_id);
                            }
                        }
                    ]
                });
                alert.present();
                _this.camera_post = '';
                var a = data;
                if (a.data) {
                    var b = a.data;
                    _this.mainImage = b.mainImage;
                    _this.recipeTitle = b.recipeTitle;
                    if (b.views) {
                        _this.views = b.views.length;
                        _this.likes = b.likes.length;
                    }
                    _this.mealType = b.mealType;
                    _this.duration = b.duration;
                    _this.level = b.level;
                    _this.description = b.description;
                    _this.ingredients = b.ingredients;
                    _this.instructions = b.instructions;
                    _this.categories = b.categories;
                    _this.email = b.email;
                    _this.recipe_id = b._id;
                    _this.status = b.status;
                    _this.recipeImages = b.recipeImages;
                    if (localStorage['email'] != _this.email) {
                        _this.userName = b.userName;
                    }
                    _this.a = {};
                    for (var i = 0; i < _this.ingredients.length; i++) {
                        _this.ingredientss.push({ ing: _this.ingredients[i], checkStatus: false });
                    }
                    ;
                    for (var i = 0; i < _this.instructions.length; i++) {
                        _this.instructionss.push({ ins: _this.instructions[i], checkStatus: false });
                    }
                    ;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    ViewRecipesPage.prototype.Confirm_post = function (recipe_id) {
        var _this = this;
        var recipe_id = recipe_id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.postRecipe(recipe_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_7 = _this.alertCtrl.create({
                        subTitle: 'Post successfully!',
                        buttons: ['OK']
                    });
                    alert_7.present();
                    _this.navCtrl.setRoot('MainPage');
                }
                else {
                    var alert_8 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Something went wrong!',
                        buttons: ['OK']
                    });
                    alert_8.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    ViewRecipesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-view-recipes',
            templateUrl: 'view-recipes.html',
        }),
        __metadata("design:paramtypes", [StreamingMedia, DomSanitizer, LoadingController, SocialSharing, AlertController, SecurityProvider, NavController, NavParams])
    ], ViewRecipesPage);
    return ViewRecipesPage;
}());
export { ViewRecipesPage };
//# sourceMappingURL=view-recipes.js.map