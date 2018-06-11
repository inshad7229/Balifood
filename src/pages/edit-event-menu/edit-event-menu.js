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
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEventMenuPage = /** @class */ (function () {
    function EditEventMenuPage(translateService, securityProvider, loadingCtrl, alertCtrl, modalCtrl, navCtrl, navParams) {
        this.translateService = translateService;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Menu_event = [];
        this.me = localStorage['user_id'];
        this.myname = localStorage['username'];
        this.Menu = {};
        this.eventData = this.navParams.get('eventData');
        if (this.eventData) {
            this.Menu_event = this.eventData.menu;
            this.eventType = this.eventData.eventType;
            this.event_userId = this.eventData.userId;
            this.event_id = this.eventData._id;
        }
        if (this.event_userId == localStorage['user_id']) {
            this.editEvent = true;
        }
        else {
            this.editEvent = false;
        }
    }
    EditEventMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditEventMenuPage');
    };
    EditEventMenuPage.prototype.onEvent = function () {
        this.navCtrl.push('EventsPage');
    };
    EditEventMenuPage.prototype.onDeletemenu = function (menuId) {
        var _this = this;
        var a = {
            eventId: this.event_id,
            menuId: menuId
        };
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('popup.Please_wait')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.onDeletemenu(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: 'Menu Removed from event!',
                        buttons: ['OK']
                    });
                    alert_1.present();
                    // this.navCtrl.push('EventsPage');
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    EditEventMenuPage.prototype.presentConfirm = function (menuId, Menu) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you really want to delete this menu item?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Delete clicked');
                        _this.onDeletemenu(menuId);
                        Menu.deleted = true;
                    }
                }
            ]
        });
        alert.present();
    };
    EditEventMenuPage.prototype.onAdd = function () {
        var _this = this;
        var Modal = this.modalCtrl.create('EditEventMenuItemFormPage', {
            eventData: this.eventData,
            newData: true
        });
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("event_menu" + JSON.stringify(data));
                _this.Menu_event = data.menu;
                localStorage['menu_id'] = data.owner_id;
            }
        });
        Modal.present();
    };
    EditEventMenuPage.prototype.onUpdateMenu = function (menu_data) {
        var _this = this;
        var Modal = this.modalCtrl.create('EditEventMenuItemFormPage', {
            menu_data: menu_data,
            eventData: this.eventData,
            newData: false
        });
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("event_menu" + JSON.stringify(data));
                _this.Menu_event = data.menu;
                localStorage['menu_id'] = data.owner_id;
            }
        });
        Modal.present();
    };
    EditEventMenuPage.prototype.onDeleteOwner = function (menu_data) {
        var _this = this;
        menu_data.id = localStorage['event_id'];
        menu_data.menuId = menu_data._id;
        menu_data.owner_id = localStorage['user_id'];
        menu_data.owner_name = localStorage['username'];
        if (menu_data) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.updateMenu(menu_data); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    JSON.stringify(a);
                    if (a.success == true) {
                        var alert_2 = _this.alertCtrl.create({
                            subTitle: 'Owner deleted!',
                            buttons: ['OK']
                        });
                        alert_2.present();
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () { });
            });
        }
    };
    EditEventMenuPage.prototype.goBack = function () {
        this.navCtrl.push('EditEventPage', { eventData: this.eventData });
    };
    EditEventMenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-event-menu',
            templateUrl: 'edit-event-menu.html',
        }),
        __metadata("design:paramtypes", [TranslateService,
            SecurityProvider,
            LoadingController,
            AlertController,
            ModalController,
            NavController,
            NavParams])
    ], EditEventMenuPage);
    return EditEventMenuPage;
}());
export { EditEventMenuPage };
//# sourceMappingURL=edit-event-menu.js.map