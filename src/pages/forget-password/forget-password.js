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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
import { FormBuilder, Validators } from '@angular/forms';
var ForgetPasswordPage = /** @class */ (function () {
    function ForgetPasswordPage(alertCtrl, formBuilder, securityProvider, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.resend_btn = 'false';
        this.login = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.salonregister = formBuilder.group({
            useremail: ['', Validators.compose([
                    Validators.pattern(emailRegex), Validators.required
                ])]
        });
    }
    ForgetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPage');
    };
    ForgetPasswordPage.prototype.onSend = function () {
        var _this = this;
        this.securityProvider.forgot(this.login)
            .subscribe(function (data) {
            console.log("data" + JSON.stringify(data));
            var a = data;
            if (a.success == true) {
                _this.resend_btn = 'true';
                var alert_1 = _this.alertCtrl.create({
                    subTitle: a.msg,
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                _this.resend_btn = 'false';
                var alert_2 = _this.alertCtrl.create({
                    subTitle: a.message,
                    buttons: ['OK']
                });
                alert_2.present();
            }
        }),
            function (error) { };
    };
    ForgetPasswordPage.prototype.onLogin = function () {
        this.navCtrl.push('LoginPage');
    };
    ForgetPasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forget-password',
            templateUrl: 'forget-password.html',
        }),
        __metadata("design:paramtypes", [AlertController, FormBuilder, SecurityProvider, NavController, NavParams])
    ], ForgetPasswordPage);
    return ForgetPasswordPage;
}());
export { ForgetPasswordPage };
//# sourceMappingURL=forget-password.js.map