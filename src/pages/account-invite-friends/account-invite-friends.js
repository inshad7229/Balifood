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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
var AccountInviteFriendsPage = /** @class */ (function () {
    function AccountInviteFriendsPage(loadingCtrl, securityProvider, toastCtrl, sms, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.securityProvider = securityProvider;
        this.toastCtrl = toastCtrl;
        this.sms = sms;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // this.contacts = JSON.parse(localStorage['contact_data']);
        // this.con = JSON.parse(localStorage['contact_data']);
    }
    AccountInviteFriendsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.listcontacts = localStorage['contactNames'];
        //alert(this.listcontacts);
        this.getContact();
        var a = localStorage['user_id'];
        this.securityProvider.AllUserFriend(a)
            .subscribe(function (data) {
            var a = data;
            _this.allUser = a.allUsers;
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    AccountInviteFriendsPage.prototype.getContact = function () {
        var _this = this;
        var a = {
            user_id: localStorage['user_id']
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.FetchContact(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                _this.ContactFriends = a.contacts;
                var dataa = _this.ContactFriends.filter(function (arg) { return arg.status != true; });
                if (dataa.length > 0) {
                    _this.contactData = dataa;
                    _this.contactData2 = dataa;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    AccountInviteFriendsPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.contactData = this.contactData.filter(function (p) {
                if (p.number.name) {
                    return (p.number.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.contactData = this.contactData2;
        }
    };
    AccountInviteFriendsPage.prototype.getStatus = function (cont) {
        var data = this.ContactFriends.filter(function (arg) { return arg.number != cont; });
        if (data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AccountInviteFriendsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountInviteFriendsPage');
    };
    AccountInviteFriendsPage.prototype.Sendreq = function (number, i) {
        var _this = this;
        this.sms.send(number, 'https://www.dropbox.com/s/fhqgms77yvo5qo4/Balifood%4010Jan_18.zip?dl=0').then(function (data) {
            if (data == "OK" || data == 'OK') {
                _this.index = i;
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
    AccountInviteFriendsPage.prototype.onInviteAll = function () {
        for (var i = 0; i < this.contacts.length; i++) {
            var a = this.contacts[i].phoneNumbers[0].value;
            this.Sendreq1(a);
        }
    };
    AccountInviteFriendsPage.prototype.Sendreq1 = function (number) {
        var _this = this;
        this.sms.send(number, 'https://www.dropbox.com/s/fhqgms77yvo5qo4/Balifood%4010Jan_18.zip?dl=0').then(function (data) {
            if (data == "OK" || data == 'OK') {
                var toast = _this.toastCtrl.create({
                    message: _this.translateService.instant('popup.msgsent'),
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
                    message: _this.translateService.instant('popup.Something'),
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
    AccountInviteFriendsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-account-invite-friends',
            templateUrl: 'account-invite-friends.html',
        }),
        __metadata("design:paramtypes", [LoadingController, SecurityProvider, ToastController, SMS, NavController, NavParams])
    ], AccountInviteFriendsPage);
    return AccountInviteFriendsPage;
}());
export { AccountInviteFriendsPage };
//# sourceMappingURL=account-invite-friends.js.map