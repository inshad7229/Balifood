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
import { NavController, IonicPage, NavParams, ActionSheetController, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { Camera } from '@ionic-native/camera';
import { ModalController } from 'ionic-angular';
var MyRecipeInsidePage = /** @class */ (function () {
    function MyRecipeInsidePage(viewCtrl, loadingCtrl, modalCtrl, camera, actionSheetCtrl, securityProvider, navCtrl, navParams, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.count = 0;
        this.recipes_data = this.navParams.get('recipes_data');
        this.category = this.recipes_data.categoryData;
        this.cat = this.recipes_data.categoryData;
        this.eventType = this.navParams.get('eventType');
        //JSON.stringify(this.navParams);
        this.addurlvalue = false;
        this.list = 'true';
        this.pop_div = 'false';
        this.post = this.navParams.get('post');
        this.camera_post = this.navParams.get('camera_post');
        this.RecipeLink = this.navParams.get('RecipeLink');
        this.Menu = this.navParams.get('Menu');
        this.eventData = this.navParams.get('eventData');
        this.menu_data = this.navParams.get('menu_data');
    }
    MyRecipeInsidePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyRecipeInsidePage');
    };
    MyRecipeInsidePage.prototype.ngOnInit = function () {
        this.getfav_sav_Status();
    };
    MyRecipeInsidePage.prototype.getfav_sav_Status = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.get_status(a)
            .subscribe(function (data) {
            var a = data.myRecipes;
            _this.myfavRecipe = data.favouriteRecipes;
            console.log('get_status' + JSON.stringify(a));
        }),
            function (error) { };
    };
    MyRecipeInsidePage.prototype.getStatusFOrdisabled = function (id) {
        var data = this.myfavRecipe.filter(function (arg) { return arg.recipe_id == id; });
        if (data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MyRecipeInsidePage.prototype.onIconlist = function () {
        this.list = 'false';
    };
    MyRecipeInsidePage.prototype.onIcongrid = function () {
        this.list = 'true';
    };
    MyRecipeInsidePage.prototype.onNewRecipe = function () {
        this.pop_div = 'false';
        this.navCtrl.push('NewRecipesPage', { insidecategory: this.recipes_data.category });
    };
    MyRecipeInsidePage.prototype.presentPopover = function () {
        this.count++;
        if (this.count % 2 != 0) {
            this.pop_div = 'true';
        }
        else {
            this.pop_div = 'false';
        }
    };
    MyRecipeInsidePage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.category = this.category.filter(function (p) {
                return (p.recipeTitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.category = this.cat;
        }
    };
    MyRecipeInsidePage.prototype.onViewDetail = function (recipe_id, recipe_data) {
        this.pop_div = 'false';
        this.navCtrl.push('ViewRecipesPage', { recipe_data: recipe_data, post: this.post, camera_post: this.camera_post });
    };
    MyRecipeInsidePage.prototype.onAddFavourite = function (recipe_id) {
        var _this = this;
        var a = {
            user_id: localStorage['user_id'],
            recipe_id: recipe_id
        };
        this.securityProvider.addFav(a)
            .subscribe(function (data) {
            console.log("Add_fav_data" + JSON.stringify(data));
            var a = data;
            _this.getfav_sav_Status();
            if (a.message == "recipe added to favourite list") {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: 'Recipe added to favourite list',
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    subTitle: 'Recipe successfully removed from favourite list.',
                    buttons: ['OK']
                });
                alert_2.present();
            }
        }),
            function (error) { };
    };
    MyRecipeInsidePage.prototype.onImports = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Import From',
            buttons: [{
                    text: 'Gallery',
                    handler: function () {
                        _this.fromgallery();
                        _this.pop_div = false;
                    }
                },
                {
                    text: 'Camera',
                    handler: function () {
                        _this.fromcamera();
                        _this.pop_div = false;
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    MyRecipeInsidePage.prototype.fromcamera = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
            //allowEdit:true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
            var modal = _this.modalCtrl.create('ImportRecipeImagePage', { pic: _this.pic, mainImage: imageData });
            modal.present();
            console.log(_this.Recipes.mainImage);
        }, function (err) {
            console.log('camera not working');
        });
    };
    MyRecipeInsidePage.prototype.fromgallery = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
            // allowEdit:true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
            var modal = _this.modalCtrl.create('ImportRecipeImagePage', { pic: _this.pic, mainImage: imageData });
            modal.present();
            console.log(_this.Recipes.mainImage);
        }, function (err) {
            console.log('gallery not working');
        });
    };
    MyRecipeInsidePage.prototype.AddUrl = function () {
        this.pop_div = 'false';
        this.addurlvalue = true;
    };
    MyRecipeInsidePage.prototype.onRecipeTextAdd = function () {
        var _this = this;
        var a = {
            url: this.urltext
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.AddUrl(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                console.log("data" + JSON.stringify(data));
                _this.addurlvalue = false;
                var a = data;
                var b = a.data;
                if (a.success == true) {
                    _this.urltext = '';
                    _this.navCtrl.push('ImportRecipeUrlPage', { ImportUrlData: b });
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                console.log("err" + JSON.stringify(error));
                _this.addurlvalue = false;
            });
        });
    };
    MyRecipeInsidePage.prototype.onCancel = function () {
        this.addurlvalue = false;
    };
    MyRecipeInsidePage.prototype.onAttachedRecipeLink = function () {
        if (this.menu_data) {
            // alert(this.Recipe_id);
            this.navCtrl.push('EditEventMenuItemFormPage', { editEvent: 'editEvent', eventData: this.eventData, Menuitem: this.Menu, Recipe_id: this.Recipe_id, eventType: this.eventType, menu_data: this.menu_data });
        }
        else {
            if (this.eventType) {
                this.navCtrl.push('CreatenewmenuitemsformPage', { Menuitem: this.Menu, Recipe_id: this.Recipe_id, eventType: this.eventType });
            }
            else {
                this.navCtrl.push('CreatenewmenuitemsformPage', { Menuitem: this.Menu, Recipe_id: this.Recipe_id });
            }
        }
    };
    MyRecipeInsidePage.prototype.onCheckRecipe = function (recipe_id, recipe_name, index) {
        //alert(JSON.stringify(this.Menu));
        this.checkStatus = index;
        this.Menu.recipe_name = recipe_name;
        this.Menu.Recipe_id = recipe_id;
    };
    MyRecipeInsidePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-recipe-inside',
            templateUrl: 'my-recipe-inside.html',
        }),
        __metadata("design:paramtypes", [ViewController, LoadingController, ModalController, Camera, ActionSheetController, SecurityProvider, NavController, NavParams, AlertController])
    ], MyRecipeInsidePage);
    return MyRecipeInsidePage;
}());
export { MyRecipeInsidePage };
//# sourceMappingURL=my-recipe-inside.js.map