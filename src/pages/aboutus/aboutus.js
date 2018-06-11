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
import { SecurityProvider } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutusPage = /** @class */ (function () {
    function AboutusPage(navCtrl, navParams, securityProvider, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.securityProvider = securityProvider;
        this.translate = translate;
    }
    AboutusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutusPage');
    };
    AboutusPage.prototype.ngOnInit = function () {
        var _this = this;
        this.securityProvider.AboutUsBalifood()
            .subscribe(function (data) {
            var a = data.content;
            _this.about = data.content;
            console.log(a);
        }),
            function (error) { };
    };
    AboutusPage.prototype.getContent = function (a) {
        if (localStorage['language'] == "heb") {
            return a.contentHebrew;
        }
        else {
            return a.content;
        }
    };
    AboutusPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-aboutus',
            templateUrl: 'aboutus.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, SecurityProvider, TranslateService])
    ], AboutusPage);
    return AboutusPage;
}());
export { AboutusPage };
//# sourceMappingURL=aboutus.js.map