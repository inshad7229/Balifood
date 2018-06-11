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
import { Platform } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEventPage = /** @class */ (function () {
    function EditEventPage(translateService, alertCtrl, loadingCtrl, modalCtrl, securityProvider, actionSheetCtrl, camera, navCtrl, navParams, platform) {
        var _this = this;
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.securityProvider = securityProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventData = this.navParams.get('eventData');
        platform.registerBackButtonAction(function () {
            _this.onEvent();
        }, 2);
        this.menuPopUp = false;
        this.Event = {};
        if (this.eventData) {
            this.Event.event_name = this.eventData.event_name;
            if (this.eventData.image) {
                this.pic = this.eventData.image;
            }
            else {
                this.pic = 'assets/imgs/add-profiler.png';
            }
            var c = new Date(this.eventData.date).toJSON().slice(0, 10).replace(/-/g, '-');
            var a = c.split('-');
            this.Event.date = a[0] + '-' + a[1] + '-' + a[2];
            this.Event.time = this.eventData.time;
            this.Event.address = this.eventData.address;
            this.Event.event_id = this.eventData._id;
            this.Event.location = this.eventData.location.coordinates[0] + "," + this.eventData.location.coordinates[1];
            this.eventType = this.eventData.eventType;
        }
        this.datee = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var date = this.datee.split('-');
        this.min_date = date[0] + '-' + date[1] + '-' + date[2];
        this.enableEdit = true;
    }
    EditEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditEventPage');
    };
    EditEventPage.prototype.ionViewDidEnter = function () {
        this.refreshEvent();
    };
    EditEventPage.prototype.refreshEvent = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('popup.Please_wait')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.thisEvent(_this.eventData._id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                // alert(JSON.stringify(a));
                localStorage['event_id'] = _this.eventData._id;
                if (a.success == true) {
                    _this.eventData = a.eventData;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    EditEventPage.prototype.onEvent = function () {
        var _this = this;
        var a = localStorage['event_id'];
        this.securityProvider.thisEvent(a)
            .subscribe(function (data) {
            var a = data;
            if (a.success == true) {
                _this.eventData = a.eventData;
            }
            console.log("data" + JSON.stringify(data));
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
        this.navCtrl.push('MyEventsPage', { eventData: this.eventData });
    };
    EditEventPage.prototype.enableEditing = function () {
        this.enableEdit = false;
    };
    EditEventPage.prototype.onMenuCreate = function () {
        this.menuPopUp = true;
    };
    EditEventPage.prototype.onCreateNewMenu = function () {
        this.navCtrl.push('EditEventMenuPage', {
            eventData: this.eventData,
            eventType: this.eventType
        });
        this.menuPopUp = false;
    };
    EditEventPage.prototype.onCreateExistingMenu = function () {
        this.menuPopUp = false;
        this.navCtrl.push('EventsPage', { existing: 'existingEvent' });
    };
    EditEventPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translateService.instant('popup.Select_Image_Source'),
            buttons: [{
                    text: this.translateService.instant('popup.Load_from_Library'),
                    handler: function () {
                        _this.fromgallery();
                    }
                },
                {
                    text: this.translateService.instant('popup.Use_Camera'),
                    handler: function () {
                        _this.fromcamera();
                    }
                },
                {
                    text: this.translateService.instant('popup.Cancel'),
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    EditEventPage.prototype.fromgallery = function () {
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
            _this.enableEdit = false;
        }, function (err) {
            console.log('gallery not working');
        });
    };
    EditEventPage.prototype.fromcamera = function () {
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
            _this.enableEdit = false;
        }, function (err) {
            console.log('camera not working');
        });
    };
    EditEventPage.prototype.onSave = function () {
        var _this = this;
        if (this.Event) {
            var loading_1 = this.loadingCtrl.create({
                content: this.translateService.instant('popup.Please_wait')
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.UpdateEvent(_this.Event); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var alert_1 = _this.alertCtrl.create({
                            subTitle: _this.translateService.instant('popup.no_event'),
                            buttons: [_this.translateService.instant('popup.ok')]
                        });
                        alert_1.present();
                        _this.navCtrl.setRoot('EventsPage');
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () { });
            });
        }
    };
    EditEventPage.prototype.change = function (date) {
        var a = date.split('T');
        return a[0];
    };
    EditEventPage.prototype.onAddMember = function () {
        this.navCtrl.push('EditEventMemberPage', {
            eventData: this.eventData
        });
    };
    EditEventPage.prototype.onBringItem = function () {
        this.event_id = this.Event.event_id;
        this.navCtrl.push('EditEventWhatToBringPage', {
            event_id: this.event_id,
            eventType: 'mutualEvent',
            eventData: this.eventData
        });
    };
    EditEventPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-event',
            templateUrl: 'edit-event.html',
        }),
        __metadata("design:paramtypes", [TranslateService, AlertController, LoadingController, ModalController, SecurityProvider, ActionSheetController, Camera, NavController, NavParams, Platform])
    ], EditEventPage);
    return EditEventPage;
}());
export { EditEventPage };
//# sourceMappingURL=edit-event.js.map