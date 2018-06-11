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
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
var CreateMenuOwnerPage = /** @class */ (function () {
    function CreateMenuOwnerPage(viewCtrl, modalCtrl, securityProvider, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreateMenuOwnerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CreateMenuOwnerPage');
        var a = localStorage['user_id'];
        this.securityProvider.AllUserFriend(a)
            .subscribe(function (data) {
            //alert(JSON.stringify(data));
            var a = data;
            _this.allUser = a.allUsers;
            _this.allUser2 = a.allUsers;
        }),
            function (error) { };
    };
    CreateMenuOwnerPage.prototype.ngOnInit = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.MyEvent(a)
            .subscribe(function (data) {
            var a = data;
            _this.Events = a.userEvents;
            console.log("data" + JSON.stringify(data));
            _this.matchEvent();
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    CreateMenuOwnerPage.prototype.matchEvent = function () {
        var a = localStorage['event_id'];
        var data = this.Events.filter(function (arg) { return arg._id == a; });
        if (data.length > 0) {
            var a = data[0];
            this.eventMember = this.getOrderData(a.members);
        }
        else {
            console.log("no event data" + JSON.stringify(data));
        }
    };
    CreateMenuOwnerPage.prototype.getOrderData = function (data) {
        var a = data.sort(function (x, z) { return (x.username.toLowerCase() < z.username.toLowerCase() ? -1 : 1); });
        return a;
    };
    CreateMenuOwnerPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.allUser = this.allUser.filter(function (p) {
                if (p.username) {
                    return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.allUser = this.allUser2;
        }
    };
    CreateMenuOwnerPage.prototype.onCheckmember = function (index, data) {
        this.checkStatus = index;
        this.userName = data.username;
        this.user_id = data.member_id;
        console.log("check_data" + JSON.stringify(data));
    };
    CreateMenuOwnerPage.prototype.onDone = function () {
        var a = {
            userName: this.userName,
            user_id: this.user_id
        };
        this.viewCtrl.dismiss(a);
    };
    CreateMenuOwnerPage.prototype.onClose = function () {
        this.viewCtrl.dismiss();
    };
    CreateMenuOwnerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-menu-owner',
            templateUrl: 'create-menu-owner.html',
        }),
        __metadata("design:paramtypes", [ViewController, ModalController, SecurityProvider, NavController, NavParams])
    ], CreateMenuOwnerPage);
    return CreateMenuOwnerPage;
}());
export { CreateMenuOwnerPage };
//# sourceMappingURL=create-menu-owner.js.map