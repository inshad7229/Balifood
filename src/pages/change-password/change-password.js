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
import { NavController, NavParams, IonicPage, LoadingController, AlertController, Config } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(loadingCtrl, config, navParams, securityProvider, navCtrl, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.config = config;
        this.navParams = navParams;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.getcurrentPassword = function (password) {
        if (password) {
            var a = localStorage['password'];
            if (password == a) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    ChangePasswordPage.prototype.getMatchPassword = function (password, confPassword) {
        if (confPassword) {
            if (password == confPassword) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    ChangePasswordPage.prototype.matchdata = function () {
        if (this.Current_password && this.New_Password && this.Confirm_Password) {
            return true;
        }
        else {
            return false;
        }
    };
    ChangePasswordPage.prototype.onChangePassword = function () {
        var _this = this;
        var a = {
            userId: localStorage['user_id'],
            newPassword: this.New_Password,
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.Changepassword(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true || a.success == 'true') {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: _this.translateService.instant(a.message),
                        buttons: [_this.translateService.instant('popup.ok')]
                    });
                    alert_1.present();
                    _this.navCtrl.pop();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: _this.translateService.instant('popup.tilte'),
                    subTitle: _this.translateService.instant('popup.Something'),
                    buttons: [_this.translateService.instant('popup.ok')]
                });
                alert.present();
            });
        });
    };
    ChangePasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-change-password',
            templateUrl: 'change-password.html',
        }),
        __metadata("design:paramtypes", [LoadingController, Config, NavParams, SecurityProvider, NavController, AlertController])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.js.map