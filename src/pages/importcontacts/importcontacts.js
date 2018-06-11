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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { ToastController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
var ImportcontactsPage = /** @class */ (function () {
    function ImportcontactsPage(securityProvider, toastCtrl, sms, navCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.toastCtrl = toastCtrl;
        this.sms = sms;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contacts = this.navParams.get('allContacts');
    }
    ImportcontactsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ImportcontactsPage');
        var a = localStorage['user_id'];
        this.securityProvider.AllUserFriend(a)
            .subscribe(function (data) {
            var a = data;
            _this.allUser = a.allUsers;
        }),
            function (error) { };
    };
    ImportcontactsPage.prototype.img = function (phone) {
        if (this.allUser) {
            if (phone) {
                var data = this.allUser.filter(function (arg) { return arg.contactNumber == phone; });
                console.log("data" + JSON.stringify(data));
                if (data.length > 0) {
                    return data[0].profileImage;
                }
                else {
                    return "assets/imgs/profile_img.png";
                }
            }
        }
    };
    ImportcontactsPage.prototype.Send = function (number) {
        var _this = this;
        this.sms.send(number, 'https://www.dropbox.com/s/fhqgms77yvo5qo4/Balifood%4010Jan_18.zip?dl=0').then(function (data) {
            if (data == "OK" || data == 'OK') {
                var toast = _this.toastCtrl.create({
                    message: 'Message sent',
                    duration: 3000,
                    position: 'top'
                });
                toast.onDidDismiss(function () {
                    console.log('Dismissed toast');
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Something went wrong!',
                    duration: 3000,
                    position: 'top'
                });
                toast.onDidDismiss(function () {
                    console.log('Dismissed toast');
                });
                toast.present();
            }
        }), function (err) {
            alert("Err" + JSON.stringify(err));
        };
    };
    ImportcontactsPage.prototype.onInviteAll = function () {
        for (var i = 0; i < this.contacts.length; i++) {
            var a = this.contacts[i].phoneNumbers[0].value;
            this.Send(a);
        }
    };
    ImportcontactsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-importcontacts',
            templateUrl: 'importcontacts.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, ToastController, SMS, NavController, NavParams])
    ], ImportcontactsPage);
    return ImportcontactsPage;
}());
export { ImportcontactsPage };
//# sourceMappingURL=importcontacts.js.map