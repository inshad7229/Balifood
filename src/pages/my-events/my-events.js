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
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
var heroesUrl = 'http://18.218.43.56:5001/api/';
var MyEventsPage = /** @class */ (function () {
    function MyEventsPage(transfer, file, actionSheetCtrl, camera, alertCtrl, loadingCtrl, translate, securityProvider, navCtrl, navParams, platform) {
        var _this = this;
        this.transfer = transfer;
        this.file = file;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate.use(localStorage['language']);
        platform.registerBackButtonAction(function () {
            _this.eventList();
        }, 2);
        this.pet = 'Menu';
        this.visible = 'md-add-circle';
        this.post_img = false;
        this.eventData = this.navParams.get('eventData');
        localStorage["event_id"] = this.eventData._id;
        if (this.navParams.get('lastPage') != 'notifications') {
            this.refreshEvent();
        }
        //this.getAverageScores();
        for (var k = 0; k < this.eventData.menu.length; k++) {
            this.eventData.menu[k].mygrade = this.getMyGrade(this.eventData.menu[k], this.eventData.menu[k].grade);
        }
        console.log("event_data" + JSON.stringify(this.eventData));
        this.eventUserId = this.eventData.userId;
        if (this.eventUserId == localStorage['user_id']) {
            this.EventOwner = true;
        }
        else {
            this.EventOwner = false;
        }
        console.log("eventData" + JSON.stringify(this.eventData));
    }
    MyEventsPage.prototype.fun = function (date) {
        var a = date.split('T');
        return a[0];
    };
    MyEventsPage.prototype.getAvg = function (data) {
        var avg = Array.from(data.reduce(function (acc, obj) { return Object.keys(obj).reduce(function (acc, key) { return typeof obj[key] == "number"
            ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
            : acc; }, acc); }, new Map()), function (_a) {
            var name = _a[0], values = _a[1];
            return ({ name: name, average: values.reduce(function (a, b) { return a + b; }) / values.length });
        });
        if (avg[0]) {
            return avg[0].average;
        }
        else {
            return 'Not Submitted';
        }
    };
    MyEventsPage.prototype.eventList = function () {
        if (this.navParams.get('lastPage') == 'notifications') {
            this.navCtrl.setRoot('NotificationPage');
        }
        else {
            this.navCtrl.setRoot('EventsPage');
        }
    };
    MyEventsPage.prototype.refreshEvent = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.thisEvent(localStorage['event_id']); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    _this.eventData = a.eventData;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MyEventsPage.prototype.addGrade = function (value, menu) {
        var _this = this;
        // alert(value);
        menu.grades = value;
        var a = {
            eventId: this.eventData._id,
            menuId: menu._id,
            userId: localStorage['user_id'],
            grade: value
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.addGrades(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: 'Grades added successfully!',
                        buttons: ['OK']
                    });
                    alert_1.present();
                    menu.grades = value;
                    // this.navCtrl.pop();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MyEventsPage.prototype.camelize = function (str) {
        return str;
        // return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    MyEventsPage.prototype.findObjectByKey = function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    };
    MyEventsPage.prototype.setMyGrades = function (value, a) {
        return a.grades = value;
    };
    MyEventsPage.prototype.getMyGrade = function (a, arr) {
        if (this.findObjectByKey(arr, 'userId', localStorage['user_id']) == null) {
            a.grades = 0;
            return "0";
        }
        else {
            a.grades = this.findObjectByKey(arr, 'userId', localStorage['user_id']).grade;
            return this.findObjectByKey(arr, 'userId', localStorage['user_id']).grade;
        }
    };
    MyEventsPage.prototype.toggle = function (a) {
        if (a.visible) {
            a.visible = false;
            this.addGrade(a.grades, a);
            //this.setMyGrades(a.grades, a);
        }
        else {
            a.visible = true;
            //this.addGrade(a.grades);
        }
    };
    MyEventsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.date = this.eventData.date;
        var countDownDate = new Date(this.date).getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.checkTime = days + "-" + hours + "-" + minutes + "-" + seconds + "-";
        var t = this.checkTime.split("-");
        this.day = t[0];
        this.hour = t[1];
        this.minute = t[2];
        this.second = t[3];
        if (distance < 0) {
            this.EXPIREDEVENTS = "EXPIRED";
        }
        //console.log('ionViewDidLoad MyEventsPage');
        setTimeout(function () {
            //alert(this.navCtrl.getActive().name);
            _this.ionViewDidLoad();
        }, 1000);
    };
    MyEventsPage.prototype.onViewDetail = function (recipe_id, recipe_data) {
        this.navCtrl.push('ViewRecipesPage', {
            recipe_data: recipe_data
        });
        console.log("recipe_data" + JSON.stringify(recipe_data));
        var a = {
            recipe_id: recipe_id,
            user_id: localStorage['user_id']
        };
        this.securityProvider.View_detail(a)
            .subscribe(function (data) {
            console.log('View_data' + JSON.stringify(data));
        }),
            function (error) { };
    };
    MyEventsPage.prototype.change = function (date) {
        var a = date.split('T');
        return a[0];
    };
    MyEventsPage.prototype.onEditEvents = function () {
        this.navCtrl.push('EditEventPage', { eventData: this.eventData });
    };
    MyEventsPage.prototype.onDeleteMember = function (member_id) {
        var _this = this;
        var a = {
            eventId: this.eventData._id,
            memberId: member_id
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.onDeleteMemberFromEvent(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_2 = _this.alertCtrl.create({
                        subTitle: 'Member deleted successfully!',
                        buttons: ['OK']
                    });
                    alert_2.present();
                    _this.navCtrl.pop();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MyEventsPage.prototype.ondeleteEvent = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            message: 'Are you sure want to delete event?',
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
                        _this.confirmEvents();
                    }
                }
            ]
        });
        confirm.present();
    };
    MyEventsPage.prototype.confirmEvents = function () {
        var _this = this;
        var event_id = this.eventData._id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.ondeleteEvent(event_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_3 = _this.alertCtrl.create({
                        subTitle: 'Event deleted successfully!',
                        buttons: ['OK']
                    });
                    alert_3.present();
                    _this.navCtrl.pop();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MyEventsPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [{
                    text: 'Load from Library',
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
    MyEventsPage.prototype.fromgallery = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = imageData;
            // this.post_img=true
            _this.onPostImage(_this.pic);
        }, function (err) {
            console.log('gallery not working');
        });
    };
    MyEventsPage.prototype.fromcamera = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.pic = imageData;
            // this.post_img=true
            _this.onPostImage(_this.pic);
        }, function (err) {
            console.log('camera not working');
        });
    };
    MyEventsPage.prototype.onPostImage = function (image) {
        var _this = this;
        var a = Math.random();
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'photo',
            fileName: 'image' + a,
            chunkedMode: false,
            headers: {}
        };
        fileTransfer.upload(image, heroesUrl + 'addEventImages/' + this.eventData._id, options)
            .then(function (data) {
            var a = data;
            var alert = _this.alertCtrl.create({
                subTitle: 'Image post successfully!',
                buttons: ['OK']
            });
            alert.present();
            _this.post_img = false;
        }, function (err) {
        });
    };
    MyEventsPage.prototype.onPostImageCancel = function () {
        this.post_img = false;
    };
    MyEventsPage.prototype.onPhoto = function () {
        this.navCtrl.push('EventPhotosPage', { event_id: this.eventData._id });
    };
    MyEventsPage.prototype.onChat = function () {
        this.navCtrl.push('EventChatPage', { event: this.eventData });
    };
    MyEventsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-events',
            templateUrl: 'my-events.html',
        }),
        __metadata("design:paramtypes", [FileTransfer, File, ActionSheetController, Camera, AlertController, LoadingController, TranslateService, SecurityProvider, NavController, NavParams, Platform])
    ], MyEventsPage);
    return MyEventsPage;
}());
export { MyEventsPage };
//# sourceMappingURL=my-events.js.map