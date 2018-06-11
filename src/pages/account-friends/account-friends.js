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
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
/**
 * Generated class for the AccountFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccountFriendsPage = /** @class */ (function () {
    function AccountFriendsPage(loadingCtrl, securityProvider, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.e = [];
        this.contactListArray = [];
    }
    AccountFriendsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.AllUserFriend(a)
            .subscribe(function (data) {
            var a = data;
            _this.allUser = a.allUsers;
            _this.allUser2 = a.allUsers;
        }),
            setTimeout(function () {
                _this.ionViewDidLoad();
            }, 10000);
        (function (error) {
            console.log("err" + JSON.stringify(error));
        });
    };
    AccountFriendsPage.prototype.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    AccountFriendsPage.prototype.getstatus = function (id) {
        if (this.allUser) {
            var data = this.allUser.filter(function (arg) { return arg._id == id; });
            if (data.length > 0) {
                return data.friendStatus;
                //return 1;
            }
            else {
                //return 0;
                return data.friendStatus;
            }
        }
    };
    AccountFriendsPage.prototype.ngOnInit = function () {
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
                console.log("contactData1" + JSON.stringify(_this.ContactFriends));
                var dataa = _this.ContactFriends;
                if (dataa.length > 0) {
                    _this.contactData = dataa;
                    console.log("contactData2" + JSON.stringify(_this.contactData));
                    _this.contactData2 = dataa;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    AccountFriendsPage.prototype.getstatuscheck = function () {
        if (this.contacts) {
            for (var _i = 0, _a = this.contacts; _i < _a.length; _i++) {
                var a = _a[_i];
                for (var _b = 0, _c = a._objectInstance.phoneNumbers; _b < _c.length; _b++) {
                    var b = _c[_b];
                    var d = b.value;
                    this.e.push(d);
                }
            }
        }
    };
    AccountFriendsPage.prototype.match = function (contactNumber) {
        var cont = contactNumber;
        var cont1 = "+91" + contactNumber;
        var cont2 = "91" + contactNumber;
        alert(cont1);
        alert("cont" + this.e.indexOf(cont));
        alert("cont1" + this.e.indexOf(cont1));
        alert("cont2" + this.e.indexOf(cont2));
        for (var i = 0; i < this.e.length; i++) {
            alert("ex" + this.e[i].includes(cont));
        }
        var data = this.e.filter(function (arg) { return arg.contactNumber == cont || arg.contactNumber == cont1 || arg.contactNumber == cont2; });
        if (data.length > 0) {
            alert('true');
        }
        else {
            alert('false');
        }
    };
    AccountFriendsPage.prototype.onChangeFun = function () {
        this.allUser = this.contacts;
        for (var i = 0; i <= this.allUser.length; i++) {
            var a = [];
            if (this.allUser[i].contactNumber.indexOf()) {
            }
        }
    };
    AccountFriendsPage.prototype.getUsers = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.allUser = this.allUser.filter(function (p) {
                if (p.username) {
                    return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.contactData = this.contactData2;
        }
    };
    AccountFriendsPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.contactData = this.contactData.filter(function (p) {
                if (p.username) {
                    return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.contactData = this.contactData2;
        }
    };
    AccountFriendsPage.prototype.allimg = function (img) {
        if (img) {
            return img;
        }
        else {
            return 'assets/imgs/profiler.png';
        }
    };
    AccountFriendsPage.prototype.onAddToFriend = function (number, recipient_id) {
        var _this = this;
        var a = {
            requester: localStorage['user_id'],
            recipient: recipient_id
        };
        this.securityProvider.AddToFriend(a)
            .subscribe(function (data) {
            var a = data;
            console.log("addFriend" + JSON.stringify(a));
            _this.ngOnInit();
        }),
            function (error) { };
    };
    AccountFriendsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-account-friends',
            templateUrl: 'account-friends.html',
        }),
        __metadata("design:paramtypes", [LoadingController, SecurityProvider, NavController, NavParams])
    ], AccountFriendsPage);
    return AccountFriendsPage;
}());
export { AccountFriendsPage };
//# sourceMappingURL=account-friends.js.map