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
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
var CreateMyEventsPage = /** @class */ (function () {
    function CreateMyEventsPage(translate, alertCtrl, loadingCtrl, modalCtrl, securityProvider, actionSheetCtrl, camera, navCtrl, navParams) {
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.securityProvider = securityProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuPopUp = false;
        this.Event = {};
        this.pic = 'assets/imgs/add-profiler.png';
        delete localStorage['event_id'];
        // localStorage['event_id']='5a8a8df5ba259548f3a90427';
        this.datee = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var a = this.datee.split('-');
        this.min_date = a[0] + '-' + a[1] + '-' + a[2];
        this.editEvent = false;
    }
    CreateMyEventsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateMyEventsPage');
    };
    CreateMyEventsPage.prototype.onEvent = function () {
        this.navCtrl.push('EventsPage');
    };
    CreateMyEventsPage.prototype.onMenuCreate = function () {
        this.menuPopUp = true;
    };
    CreateMyEventsPage.prototype.onEditEvents = function () {
        this.navCtrl.push('EditEventPage', { eventData: this.eventData });
    };
    CreateMyEventsPage.prototype.onCreateNewMenu = function () {
        if (localStorage['event_id']) {
            this.navCtrl.push('CreateNewMenuPage', {
                event_id: localStorage['event_id']
            });
            this.menuPopUp = false;
        }
        else {
            var alert_1 = this.alertCtrl.create({
                subTitle: 'Create event firstly!',
                buttons: ['OK']
            });
            alert_1.present();
            this.menuPopUp = false;
        }
    };
    CreateMyEventsPage.prototype.onCreateExistingMenu = function () {
        this.menuPopUp = false;
    };
    CreateMyEventsPage.prototype.onAddMember = function () {
        // this.navCtrl.push('CreateeventmemberPage', {
        //   event_id: localStorage['event_id']
        // });
        if (localStorage['event_id']) {
            this.navCtrl.push('CreateeventmemberPage', {
                event_id: localStorage['event_id']
            });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                subTitle: 'Create event firstly!',
                buttons: ['OK']
            });
            alert_2.present();
        }
    };
    CreateMyEventsPage.prototype.onLocation = function () {
        var _this = this;
        var Modal = this.modalCtrl.create('CreateEventLocationPage');
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("address" + JSON.stringify(data));
                var a = data;
                _this.Event.address = a.address;
                _this.lat = a.lat;
                _this.lng = a.lng;
            }
        });
        Modal.present();
    };
    CreateMyEventsPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translate.instant('popup.confirmation_recp'),
            buttons: [{
                    text: this.translate.instant('popup.Cancel'),
                    handler: function () {
                        _this.fromgallery();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.fromcamera();
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
    CreateMyEventsPage.prototype.fromgallery = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.Event.image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log('gallery not working');
        });
    };
    CreateMyEventsPage.prototype.fromcamera = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
            _this.Event.image = imageData;
        }, function (err) {
            console.log('camera not working');
        });
    };
    CreateMyEventsPage.prototype.onSave = function () {
        var _this = this;
        if (this.Event) {
            this.Event.userId = localStorage['user_id'],
                this.Event.username = localStorage['username'],
                this.Event.eventType = "myEvent";
            this.Event.location = this.lat + "," + this.lng;
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.CreateEvent(_this.Event); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var b = a.eventData;
                        _this.eventData = a.eventData;
                        console.log("event_data" + JSON.stringify(b));
                        _this.event_id = b._id;
                        localStorage['event_id'] = b._id;
                        var alert_3 = _this.alertCtrl.create({
                            subTitle: 'Event created successfully!',
                            buttons: ['OK']
                        });
                        alert_3.present();
                        _this.editEvent = true;
                        _this.onEditEvents();
                    }
                    else {
                        var alert_4 = _this.alertCtrl.create({
                            subTitle: 'sometihng went wrong!',
                            buttons: ['OK']
                        });
                        alert_4.present();
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () { });
            });
        }
    };
    CreateMyEventsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-my-events',
            templateUrl: 'create-my-events.html',
        }),
        __metadata("design:paramtypes", [TranslateService, AlertController, LoadingController, ModalController, SecurityProvider, ActionSheetController, Camera, NavController, NavParams])
    ], CreateMyEventsPage);
    return CreateMyEventsPage;
}());
export { CreateMyEventsPage };
//# sourceMappingURL=create-my-events.js.map