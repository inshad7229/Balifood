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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventMenuItemFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEventMenuItemFormPage = /** @class */ (function () {
    function EditEventMenuItemFormPage(translateService, alertCtrl, securityProvider, loadingCtrl, viewCtrl, modalCtrl, navCtrl, navParams) {
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.grades = [];
        this.Menu = {};
        this.eventData = this.navParams.get('eventData');
        console.log("eventData menu" + JSON.stringify(this.eventData));
        this.editEvent = this.navParams.get('editEvent');
        for (var i = 1; i <= 100; i++) {
            this.grades.push(i);
        }
        var a = this.eventData.eventType;
        if (a == 'mutualEvent' || a == "mutualEvent") {
            this.eventType = a;
        }
        if (this.navParams.get('menu_data')) {
            this.menu_data = this.navParams.get('menu_data');
            if (this.menu_data) {
                this.Menu = this.menu_data;
                this.Menu.Recipe_id = this.navParams.get('Recipe_id');
                localStorage['event_id'] = this.eventData._id;
                this.Menu.menuId = this.menu_data._id;
                this.Menu.id = this.eventData._id;
                this.Menu.item_name = this.menu_data.item_name;
                this.Menu.owner_name = this.menu_data.owner_name;
                this.Menu.owner_id = this.menu_data.owner_id;
                this.Menu.menuType = this.menu_data.menuType;
                this.Menu.status = this.menu_data.status;
                this.Menu.recipe_name = this.menu_data.recipe_name;
                this.Menu.recipe_link = this.menu_data.Recipe_id;
                this.Menu.grade = this.menu_data.grade;
                this.Menu.score = this.menu_data.score;
            }
        }
    }
    EditEventMenuItemFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditEventMenuItemFormPage');
    };
    EditEventMenuItemFormPage.prototype.Ownername = function () {
        var _this = this;
        //alert('here');
        var Modal = this.modalCtrl.create('CreateMenuOwnerPage');
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("Owner_data" + JSON.stringify(data));
                var a = data;
                if (_this.eventType) {
                    _this.Menu.owner_name = a.userName;
                    _this.Menu.owner_id = a.user_id;
                }
            }
        });
        Modal.present();
    };
    EditEventMenuItemFormPage.prototype.onRecipeLink = function () {
        if (this.menu_data) {
            var Modal = this.modalCtrl.create('MyRecipesPage', {
                RecipeLink: 'RecipeLink',
                Menu: this.menu_data,
                eventType: this.eventType,
                eventData: this.eventData,
                menu_data: this.menu_data
            });
            Modal.onDidDismiss(function (data) {
                if (data) {
                    //alert(JSON.stringify(data));
                    console.log("recipe_lin_data" + JSON.stringify(data));
                    var a = data;
                    var b = data.Recipes;
                }
            });
            Modal.present();
        }
        else {
            var Modal = this.modalCtrl.create('MyRecipesPage', {
                RecipeLink: 'RecipeLink',
                Menu: this.Menu,
                eventType: this.eventType,
                eventData: this.eventData
                // menu_data:this.Menu
            });
            Modal.onDidDismiss(function (data) {
                if (data) {
                    //alert(JSON.stringify(data));
                    console.log("recipe_lin_data" + JSON.stringify(data));
                    var a = data;
                    var b = data.Recipes;
                }
            });
            Modal.present();
        }
    };
    EditEventMenuItemFormPage.prototype.onSaveMenu = function () {
        //alert(JSON.stringify(this.recipe_name));
        var _this = this;
        if (this.menu_data) {
            if (!this.Menu.owner_id) {
                this.Menu.owner_id = localStorage['user_id'];
                this.Menu.owner_name = localStorage['username'];
            }
            var loading_1 = this.loadingCtrl.create({
                content: this.translateService.instant('popup.Please_wait')
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.updateMenu(_this.Menu); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var alert_1 = _this.alertCtrl.create({
                            subTitle: _this.translateService.instant('popup.Menu_updated'),
                            buttons: [_this.translateService.instant('popup.ok')]
                        });
                        alert_1.present();
                        //var b = a.updatedEventData;
                        //this.viewCtrl.dismiss(b);
                        //this.navCtrl.push('CreateNewMenuPage',{menuData:b,eventType:this.eventType});
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () { });
            });
        }
        else {
            this.Menu.event_id = localStorage['event_id'];
            if (!this.Menu.owner_id) {
                this.Menu.owner_id = localStorage['user_id'];
                this.Menu.owner_name = localStorage['username'];
            }
            var loading_2 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading_2.present())
                .flatMap(function (data) { return _this.securityProvider.AddMenu(_this.Menu); })
                .subscribe(function (data) {
                return loading_2.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var alert_2 = _this.alertCtrl.create({
                            subTitle: _this.translateService.instant('popup.Menu_Added'),
                            buttons: [_this.translateService.instant('popup.ok')]
                        });
                        alert_2.present();
                        var b = a.eventData;
                        _this.viewCtrl.dismiss(b);
                    }
                });
            }, function (error) {
                return loading_2.dismiss().then(function () { });
            });
        }
    };
    EditEventMenuItemFormPage.prototype.onClose = function () {
        this.viewCtrl.dismiss();
    };
    EditEventMenuItemFormPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-event-menu-item-form',
            templateUrl: 'edit-event-menu-item-form.html',
        }),
        __metadata("design:paramtypes", [TranslateService, AlertController, SecurityProvider, LoadingController, ViewController, ModalController, NavController, NavParams])
    ], EditEventMenuItemFormPage);
    return EditEventMenuItemFormPage;
}());
export { EditEventMenuItemFormPage };
//# sourceMappingURL=edit-event-menu-item-form.js.map