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
var CreateMutualEventPage = /** @class */ (function () {
    function CreateMutualEventPage(alertCtrl, loadingCtrl, modalCtrl, securityProvider, actionSheetCtrl, camera, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.securityProvider = securityProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuPopUp = false;
        this.MutualEvent = {};
        this.datee = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var a = this.datee.split('-');
        this.min_date = a[0] + '-' + a[1] + '-' + a[2];
        this.pic = 'assets/imgs/add-profiler.png';
        this.menu_idd = this.navParams.get('menu_id');
        //localStorage['event_id']='5a8a8df5ba259548f3a90427';
        delete localStorage['event_id'];
    }
    CreateMutualEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateMutualEventPage');
    };
    CreateMutualEventPage.prototype.onEvent = function () {
        this.navCtrl.push('EventsPage');
    };
    CreateMutualEventPage.prototype.onMenuCreate = function () {
        this.menuPopUp = true;
    };
    CreateMutualEventPage.prototype.onBringItem = function () {
        if (localStorage['event_id']) {
            this.event_id = localStorage['event_id'];
            this.navCtrl.push('CreateWhatToBringPage', {
                event_id: this.event_id,
                eventType: 'mutualEvent',
                menu_id: this.menu_idd
            });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                subTitle: 'Create Event firstly!',
                buttons: [this.translateService.instant('popup.ok')]
            });
            alert_1.present();
        }
    };
    CreateMutualEventPage.prototype.onCreateNewMenu = function () {
        if (localStorage['event_id']) {
            this.menuPopUp = false;
            this.navCtrl.push('CreateNewMenuPage', {
                event_id: localStorage['event_id'],
                eventType: 'mutualEvent'
            });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                subTitle: 'Create event firstly!',
                buttons: [this.translateService.instant('popup.ok')]
            });
            alert_2.present();
            this.menuPopUp = false;
        }
    };
    CreateMutualEventPage.prototype.onCreateExistingMenu = function () {
        this.menuPopUp = false;
    };
    CreateMutualEventPage.prototype.onAddMember = function () {
        if (localStorage['event_id']) {
            this.navCtrl.push('CreateeventmemberPage', {
                event_id: localStorage['event_id']
            });
        }
        else {
            var alert_3 = this.alertCtrl.create({
                subTitle: this.translateService.instant('popup.Create_event'),
                buttons: [this.translateService.instant('popup.ok')]
            });
            alert_3.present();
        }
    };
    CreateMutualEventPage.prototype.onLocation = function () {
        var _this = this;
        var Modal = this.modalCtrl.create('CreateEventLocationPage');
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("address" + JSON.stringify(data));
                var a = data;
                _this.MutualEvent.address = a.address;
                _this.lat = a.lat;
                _this.lng = a.lng;
            }
        });
        Modal.present();
    };
    CreateMutualEventPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translateService.instant('popup.tilte'),
            buttons: [{
                    text: this.translateService.instant('popup.Load_library'),
                    handler: function () {
                        _this.fromgallery();
                    }
                },
                {
                    text: this.translateService.instant('popup.use_camera'),
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
    CreateMutualEventPage.prototype.fromgallery = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.MutualEvent.image = imageData;
            _this.pic = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log('gallery not working');
        });
    };
    CreateMutualEventPage.prototype.fromcamera = function () {
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
            _this.MutualEvent.image = imageData;
        }, function (err) {
            console.log('camera not working');
        });
    };
    CreateMutualEventPage.prototype.onSave = function () {
        var _this = this;
        //this.MutualEvent.image='iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUU3QzQxQzVDQUIzMTFFNzhDMkRBQjJBNTEwMUEyNzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUU3QzQxQzZDQUIzMTFFNzhDMkRBQjJBNTEwMUEyNzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RTdDNDFDM0NBQjMxMUU3OEMyREFCMkE1MTAxQTI3MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RTdDNDFDNENBQjMxMUU3OEMyREFCMkE1MTAxQTI3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhhhgqYAAETFSURBVHja7J0JsGXF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31Lw8+fDdegXgg4AAICgAwAAAIIOAAAACDoAAAAg6AAAAAg6AAAAIOgAAACAoAMAAACCDgAAgKADAAAAgg4AAAAIOgAAACDoAAAACDoAAAAg6AAAAICgAwAAAIIOAACAoAMAAACCDgAAAAg6AAAAIOgAAAAIOgAAACDoAAAAgKADAAAAgg4AAICgAwAAAIIOAAAACDoAAAAg6AAAAAg6AAAAIOgAAACAoAMAAACCDgAAgKAj6AAAAAg6AAAAIOgAAACAoAMAAACCDgAAgKADAAAAgg4AAAAIOgAAACDoAAAACDoAAAAg6AAAAICgAwAAAIIOAACAoAMAAACCDgAAAAg6AAAAIOgAAAAIOgAAACDoAAAAgKADAAAAgg4AAICgAwAAAIIOAAAACDoAAAAg6AAAAAg6AAAAIOgAAACAoAMAAACCDgAAgKADAAAAgg4AAAAIOgAAACDoAAAACDoAAAAg6AAAAICgAwAAAIIOAACAoAMAAACCDgAAAAg6AAAAIOgAAAAIOgAAACDoAAAAgKADAAAAgg4AAAAIOgAAAIIOAAAACDoAAAAg6AAAAICgAwAAIOgAAACAoAMAAACCDgAAAAg6AAAAgg4AAAAIOgAAACDoAAAAgKADAAAg6AAAAICgAwAAQE78PwEGAGtCWmEKg4VvAAAAAElFTkSuQmCC'
        this.MutualEvent.userId = localStorage['user_id'],
            this.MutualEvent.username = localStorage['username'],
            this.MutualEvent.location = this.lat + "," + this.lng;
        this.MutualEvent.eventType = "mutualEvent";
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.CreateEvent(_this.MutualEvent); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var b = a.eventData;
                    console.log("event_data" + JSON.stringify(b));
                    _this.event_id = b._id;
                    localStorage['event_id'] = b._id;
                    var alert_4 = _this.alertCtrl.create({
                        subTitle: _this.translateService.instant('popup.Create_eventsss'),
                        buttons: [_this.translateService.instant('popup.ok')]
                    });
                    alert_4.present();
                    _this.navCtrl.push('EditEventPage', { eventData: a.eventData });
                }
                else {
                    var alert_5 = _this.alertCtrl.create({
                        subTitle: _this.translateService.instant('popup.Something'),
                        buttons: [_this.translateService.instant('popup.ok')]
                    });
                    alert_5.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    CreateMutualEventPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-mutual-event',
            templateUrl: 'create-mutual-event.html',
        }),
        __metadata("design:paramtypes", [AlertController, LoadingController, ModalController, SecurityProvider, ActionSheetController, Camera, NavController, NavParams])
    ], CreateMutualEventPage);
    return CreateMutualEventPage;
}());
export { CreateMutualEventPage };
//# sourceMappingURL=create-mutual-event.js.map