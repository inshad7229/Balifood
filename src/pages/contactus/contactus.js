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
var ContactusPage = /** @class */ (function () {
    function ContactusPage(formBuilder, alertCtrl, securityProvider, navCtrl, navParams) {
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contact = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.salonregister = formBuilder.group({
            useremail: ['', Validators.compose([
                    Validators.pattern(emailRegex), Validators.required
                ])],
            message: ['', Validators.compose([Validators.minLength(1), Validators.pattern(''), Validators.required])]
        });
    }
    ContactusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactusPage');
    };
    ContactusPage.prototype.onSave = function () {
        var _this = this;
        this.securityProvider.contactopen(this.contact)
            .subscribe(function (data) {
            console.log("data" + JSON.stringify(data));
            var a = data;
            if (a.success == true || a.success == 'true' || a.success == "true") {
                var alert_1 = _this.alertCtrl.create({
                    // title: 'Thanks for contact us.!',
                    // subTitle: 'We will contact you shortly !',
                    // buttons: ['OK']
                    title: _this.translateService.instant('popup.thnksContct'),
                    subTitle: _this.translateService.instant('popup.thanksmsg'),
                    buttons: [_this.translateService.instant('popup.ok')]
                });
                alert_1.present();
                _this.navCtrl.push('SettingsPage');
            }
            else {
                console.log('eror');
            }
        }),
            function (error) { };
    };
    ContactusPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-contactus',
            templateUrl: 'contactus.html',
        }),
        __metadata("design:paramtypes", [FormBuilder, AlertController, SecurityProvider, NavController, NavParams])
    ], ContactusPage);
    return ContactusPage;
}());
export { ContactusPage };
//# sourceMappingURL=contactus.js.map