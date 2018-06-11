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
var SaveRecipeDetailPage = /** @class */ (function () {
    function SaveRecipeDetailPage(loadingCtrl, socialSharing, alertCtrl, securityProvider, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ingredientss = [];
        this.instructionss = [];
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
        this.post = this.navParams.get('post');
        console.log("a" + JSON.stringify(this.recipe_data));
        if (this.recipe_data) {
            this.mainImage = this.recipe_data.mainImage;
            this.recipeTitle = this.recipe_data.recipeTitle;
            this.views = this.recipe_data.views.length;
            this.likes = this.recipe_data.likes.length;
            this.mealType = this.recipe_data.mealType;
            this.duration = this.recipe_data.duration;
            this.level = this.recipe_data.level;
            this.description = this.recipe_data.description;
            this.ingredients = this.recipe_data.ingredients;
            this.instructions = this.recipe_data.instructions;
            this.a = {};
            for (var i = 0; i < this.ingredients.length; i++) {
                this.ingredientss.push({ ing: this.ingredients[i], checkStatus: false });
            }
            ;
            for (var i = 0; i < this.instructions.length; i++) {
                this.instructionss.push({ ins: this.instructions[i], checkStatus: false });
            }
            ;
            this.categories = this.recipe_data.categories;
            this.email = this.recipe_data.email;
            this.recipe_id = this.recipe_data._id;
            this.status = this.recipe_data.status;
            this.recipeImages = this.recipe_data.recipeImages;
            if (localStorage['email'] != this.email) {
                this.userName = this.recipe_data.userName;
            }
        }
    }
    SaveRecipeDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewRecipesPage');
    };
    SaveRecipeDetailPage.prototype.onPosted = function () {
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
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: 'Post successfully!',
                        buttons: ['OK']
                    });
                    alert_1.present();
                    _this.navCtrl.setRoot('MainPage');
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Something went wrong!',
                        buttons: ['OK']
                    });
                    alert_2.present();
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
    SaveRecipeDetailPage.prototype.onImage = function (img) {
        this.mainImage = img;
    };
    SaveRecipeDetailPage.prototype.onSave = function () {
        var _this = this;
        var a = {
            recipe_id: this.recipe_id,
            user_id: localStorage['user_id']
        };
        this.securityProvider.AddtoMyRecipe(a)
            .subscribe(function (data) {
            var a = data;
            if (a.message == "Data Saved") {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Recipe saved!',
                    subTitle: 'This recipe is saved from ' + _this.userName,
                    buttons: ['OK']
                });
                alert_3.present();
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    title: 'Recipe deleted!',
                    subTitle: 'This recipe is deleted from your saved list.',
                    buttons: ['OK']
                });
                alert_4.present();
            }
            console.log("data" + JSON.stringify(data));
        }),
            function (error) { };
    };
    SaveRecipeDetailPage.prototype.onLike = function () {
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
    SaveRecipeDetailPage.prototype.share = function () {
        var message = 'Shared by baliFood App';
        var subject = this.recipeTitle;
        var file = this.mainImage;
        var url = "http://google.com";
        this.socialSharing.share(message, subject, file, url).then(function (data) {
        }).catch(function (error) { });
    };
    SaveRecipeDetailPage.prototype.cookmode1 = function () {
        this.cook = !this.cook;
    };
    SaveRecipeDetailPage.prototype.cookmode = function () {
        this.cook = !this.cook;
    };
    SaveRecipeDetailPage.prototype.onCookeding = function (index) {
        if (this.cook) {
            this.ingredientss[index].checkStatus = !this.ingredientss[index].checkStatus;
        }
    };
    SaveRecipeDetailPage.prototype.onCookedins = function (index) {
        if (this.cook) {
            this.instructionss[index].checkStatus = !this.instructionss[index].checkStatus;
        }
    };
    SaveRecipeDetailPage.prototype.onPost = function () {
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
                        subTitle: 'Recipes added successfully!',
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
    SaveRecipeDetailPage.prototype.deleteRecipe = function () {
        var _this = this;
        var a = this.recipe_id;
        this.securityProvider.deleteRecipe(a)
            .subscribe(function (data) {
            var a = data;
            console.log('delete_data' + JSON.stringify(data));
            if (a.success == 'true' || a.success == true) {
                var alert_7 = _this.alertCtrl.create({
                    subTitle: 'Recipe deleted successfully',
                    buttons: ['OK']
                });
                alert_7.present();
                _this.navCtrl.pop();
            }
            else {
                var alert_8 = _this.alertCtrl.create({
                    subTitle: a.msg,
                    buttons: ['OK']
                });
                alert_8.present();
            }
        }),
            function (error) { };
    };
    SaveRecipeDetailPage.prototype.ondeleteRecipe = function () {
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
    SaveRecipeDetailPage.prototype.onEditRecipe = function () {
        this.navCtrl.push('NewRecipesPage', { edit_recipe_data: this.recipe_data });
    };
    SaveRecipeDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-save-recipe-detail',
            templateUrl: 'save-recipe-detail.html',
        }),
        __metadata("design:paramtypes", [LoadingController, SocialSharing, AlertController, SecurityProvider, NavController, NavParams])
    ], SaveRecipeDetailPage);
    return SaveRecipeDetailPage;
}());
export { SaveRecipeDetailPage };
//# sourceMappingURL=save-recipe-detail.js.map