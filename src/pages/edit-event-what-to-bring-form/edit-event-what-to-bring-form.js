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
import { ModalController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
/**
 * Generated class for the EditEventWhatToBringFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEventWhatToBringFormPage = /** @class */ (function () {
    function EditEventWhatToBringFormPage(alertCtrl, securityProvider, loadingCtrl, viewCtrl, modalCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Menu = {};
        this.bringitems = [];
        this.Menu.bringItems = [];
        this.eventData = this.navParams.get('eventData');
        this.editbringItems = this.navParams.get('editbringItems');
        if (this.eventData) {
            this.Menu.eventId = this.eventData._id;
            if (this.editbringItems) {
                this.Menu.whatToBringId = this.editbringItems._id;
                this.Menu.memberId = this.editbringItems.memberId;
                this.Menu.memberName = this.editbringItems.memberName;
                this.Menu.bringItems = this.editbringItems.bringItems;
                this.Menu.status = this.editbringItems.status;
                this.bringitem = this.Menu.bringItems;
            }
            else {
                this.Menu.memberName = localStorage['username'];
                this.Menu.memberId = localStorage['user_id'];
            }
        }
        else {
            this.event_id = this.navParams.get('event_id');
            this.menu_id = this.navParams.get('menu_id');
        }
    }
    EditEventWhatToBringFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditEventWhatToBringFormPage');
    };
    EditEventWhatToBringFormPage.prototype.addmore = function () {
        this.bringitems.push(this.bringitem);
        this.items = this.bringitems;
        this.bringitem = '';
    };
    EditEventWhatToBringFormPage.prototype.onSaveMenu = function () {
        var _this = this;
        if (this.editbringItems) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.EditbringItem(_this.Menu); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var alert_1 = _this.alertCtrl.create({
                            subTitle: 'Item updated successfully!',
                            buttons: ['OK']
                        });
                        alert_1.present();
                        var b = a.updatedEventData;
                        _this.viewCtrl.dismiss(b);
                    }
                    else {
                        var alert_2 = _this.alertCtrl.create({
                            subTitle: 'Something went wrong!',
                            buttons: ['OK']
                        });
                        alert_2.present();
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () { });
            });
        }
        else {
            this.Menu.eventId = this.Menu.eventId;
            this.Menu.bringItems = this.bringitem;
            var loading_2 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading_2.present())
                .flatMap(function (data) { return _this.securityProvider.bringItem(_this.Menu); })
                .subscribe(function (data) {
                return loading_2.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var alert_3 = _this.alertCtrl.create({
                            subTitle: 'Item assigned successfully!',
                            buttons: ['OK']
                        });
                        alert_3.present();
                        var b = a.eventData;
                        _this.viewCtrl.dismiss(b);
                    }
                    else {
                        var alert_4 = _this.alertCtrl.create({
                            subTitle: 'Something went wrong!',
                            buttons: ['OK']
                        });
                        alert_4.present();
                    }
                });
            }, function (error) {
                return loading_2.dismiss().then(function () { });
            });
        }
    };
    EditEventWhatToBringFormPage.prototype.Ownername = function () {
        var _this = this;
        localStorage['event_id'] = this.Menu.eventId;
        var Modal = this.modalCtrl.create('CreateMenuOwnerPage');
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("Owner_data" + JSON.stringify(data));
                var a = data;
                _this.Menu.memberName = a.userName;
                _this.Menu.memberId = a.user_id;
            }
        });
        Modal.present();
    };
    EditEventWhatToBringFormPage.prototype.onClose = function () {
        this.viewCtrl.dismiss();
    };
    EditEventWhatToBringFormPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-event-what-to-bring-form',
            templateUrl: 'edit-event-what-to-bring-form.html',
        }),
        __metadata("design:paramtypes", [AlertController, SecurityProvider, LoadingController, ViewController, ModalController, NavController, NavParams])
    ], EditEventWhatToBringFormPage);
    return EditEventWhatToBringFormPage;
}());
export { EditEventWhatToBringFormPage };
//# sourceMappingURL=edit-event-what-to-bring-form.js.map