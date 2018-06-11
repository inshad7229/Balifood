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
var FaqPage = /** @class */ (function () {
    function FaqPage(securityProvider, navCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.count = 0;
    }
    FaqPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FaqPage');
    };
    FaqPage.prototype.ngOnInit = function () {
        var _this = this;
        this.securityProvider.FaqOpen()
            .subscribe(function (data) {
            console.log("data" + JSON.stringify(data));
            _this.dataa = data.data;
        }),
            function (error) { };
    };
    FaqPage.prototype.question = function (i) {
        this.count++;
        if (this.count % 2 != 0) {
            this.answer = i;
        }
        else {
            this.answer = 'p';
        }
    };
    FaqPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-faq',
            templateUrl: 'faq.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, NavController, NavParams])
    ], FaqPage);
    return FaqPage;
}());
export { FaqPage };
//# sourceMappingURL=faq.js.map