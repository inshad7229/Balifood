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
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
/**
 * Generated class for the EditEventWhatToBringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEventWhatToBringPage = /** @class */ (function () {
    function EditEventWhatToBringPage(TranslateService, securityProvider, loadingCtrl, alertCtrl, modalCtrl, navCtrl, navParams) {
        var _this = this;
        this.TranslateService = TranslateService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Menu_event = [];
        this.Menu = {};
        this.eventData = this.navParams.get('eventData');
        var a = localStorage['user_id'];
        this.securityProvider.MyEvent(a)
            .subscribe(function (data) {
            var a = data;
            if (a.success == true) {
                _this.eventData = _this.findObjectByKey(a.userEvents, '_id', _this.eventData._id);
                //   alert(JSON.stringify(this.eventData));
                if (_this.eventData) {
                    _this.event_id = _this.eventData._id;
                    _this.eventType = _this.eventData.eventType;
                    _this.Menu_event = _this.eventData.whatToBring;
                    _this.eventUserId = _this.eventData.userId;
                }
            }
            console.log("data" + JSON.stringify(data));
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
        //=this.navParams.get('eventData');
        if (this.eventUserId == localStorage['user_id']) {
            this.editItems = true;
        }
        else {
            this.editItems = false;
        }
        //alert(JSON.stringify(this.eventData));
    }
    EditEventWhatToBringPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditEventWhatToBringPage');
    };
    EditEventWhatToBringPage.prototype.findObjectByKey = function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    };
    EditEventWhatToBringPage.prototype.onDeleteOwner = function (Menu) {
        var _this = this;
        Menu.whatToBringId = Menu._id;
        delete Menu['_id'];
        Menu.memberId = localStorage['user_id'],
            Menu.memberName = localStorage['username'];
        Menu.eventId = localStorage['event_id'];
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.EditbringItem(Menu); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: 'Item updated successfully!',
                        buttons: ['OK']
                    });
                    alert_1.present();
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
            return loading.dismiss().then(function () { });
        });
    };
    EditEventWhatToBringPage.prototype.presentConfirm = function (menuId, Menu) {
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
                        _this.onDeleteitem(menuId);
                        Menu.deleted = true;
                    }
                }
            ]
        });
        alert.present();
    };
    EditEventWhatToBringPage.prototype.onAdd = function () {
        var _this = this;
        var Modal = this.modalCtrl.create('EditEventWhatToBringFormPage', {
            event_id: this.event_id,
            eventData: this.eventData,
            eventType: this.eventType,
        });
        Modal.onDidDismiss(function (data) {
            if (data) {
                _this.Menu_event = data.whatToBring;
            }
        });
        Modal.present();
    };
    EditEventWhatToBringPage.prototype.onDeleteitem = function (BringId) {
        var _this = this;
        var a = {
            eventId: this.event_id,
            whatToBringId: BringId
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.onDeleteitem(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_3 = _this.alertCtrl.create({
                        subTitle: 'Item Removed from event!',
                        buttons: ['OK']
                    });
                    alert_3.present();
                    //this.navCtrl.push('EventsPage');
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    EditEventWhatToBringPage.prototype.onEditItems = function (item) {
        var _this = this;
        var Modal = this.modalCtrl.create('EditEventWhatToBringFormPage', {
            eventData: this.eventData,
            editbringItems: item
        });
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("event_menu" + JSON.stringify(data));
                _this.Menu_event = data.whatToBring;
            }
        });
        Modal.present();
    };
    EditEventWhatToBringPage.prototype.onEvent = function () {
        this.navCtrl.push('EventsPage');
    };
    var _a;
    EditEventWhatToBringPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-event-what-to-bring',
            templateUrl: 'edit-event-what-to-bring.html',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof public !== "undefined" && public) === "function" && _a || Object, SecurityProvider, LoadingController, AlertController, ModalController, NavController, NavParams])
    ], EditEventWhatToBringPage);
    return EditEventWhatToBringPage;
}());
export { EditEventWhatToBringPage };
//# sourceMappingURL=edit-event-what-to-bring.js.map