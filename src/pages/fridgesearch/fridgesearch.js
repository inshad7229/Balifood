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
var FridgesearchPage = /** @class */ (function () {
    function FridgesearchPage(alertCtrl, securityProvider, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.offsetData = 0;
    }
    FridgesearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FridgesearchPage');
    };
    FridgesearchPage.prototype.ngOnInit = function () {
        var _this = this;
        this.securityProvider.MainRecipe(this.offsetData)
            .subscribe(function (data) {
            _this.recipedata = data.Recipes;
            _this.recipedata2 = data.Recipes;
            for (var i = 0; i < _this.recipedata.length; i++) {
                var a = _this.recipedata[i];
            }
        }),
            function (error) {
                if (error) {
                }
            };
    };
    FridgesearchPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.recipedata = this.recipedata.filter(function (p) {
                if (p.recipeTitle) {
                    return (p.recipeTitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.recipedata = this.recipedata2;
        }
    };
    FridgesearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fridgesearch',
            templateUrl: 'fridgesearch.html',
        }),
        __metadata("design:paramtypes", [AlertController, SecurityProvider, NavController, NavParams])
    ], FridgesearchPage);
    return FridgesearchPage;
}());
export { FridgesearchPage };
//# sourceMappingURL=fridgesearch.js.map