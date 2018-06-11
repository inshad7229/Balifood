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
var AccountMyPostPage = /** @class */ (function () {
    function AccountMyPostPage(securityProvider, navCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.offsetData = 0;
        this.listclass = 'list-view';
        this.list = 'true';
        this.user_id = localStorage['user_id'];
        this.user_email = localStorage['email'];
    }
    AccountMyPostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountMyPostPage');
    };
    AccountMyPostPage.prototype.ngOnInit = function () {
        var _this = this;
        this.securityProvider.MainRecipe(this.offsetData)
            .subscribe(function (data) {
            _this.dataa = data.Recipes;
            _this.getStatusFOrdisabled();
        }),
            function (error) { };
    };
    AccountMyPostPage.prototype.onIconlist = function () {
        this.listclass = 'grid-view';
        this.list = 'false';
    };
    AccountMyPostPage.prototype.onIcongrid = function () {
        this.listclass = 'list-view';
        this.list = 'true';
    };
    AccountMyPostPage.prototype.getStatusFOrdisabled = function () {
        var _this = this;
        var data = this.dataa.filter(function (arg) { return _this.user_id == arg.user_id && arg.categories != "Others"; });
        if (data.length > 0) {
            this.mydata = data;
            console.log("mydata" + JSON.stringify(this.mydata));
        }
        else {
            console.log("data1" + JSON.stringify(data));
        }
    };
    AccountMyPostPage.prototype.onViewDetail = function (recipe_id, recipe_data) {
        var _this = this;
        this.navCtrl.push('ViewRecipesPage', {
            recipe_data: recipe_data
        });
        console.log("recipe_data" + JSON.stringify(recipe_data));
        var a = {
            recipe_id: recipe_id,
            user_id: localStorage['user_id']
        };
        this.securityProvider.View_detail(a)
            .subscribe(function (data) {
            console.log('View_data' + JSON.stringify(data));
            _this.ngOnInit();
        }),
            function (error) { };
    };
    AccountMyPostPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-account-my-post',
            templateUrl: 'account-my-post.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, NavController, NavParams])
    ], AccountMyPostPage);
    return AccountMyPostPage;
}());
export { AccountMyPostPage };
//# sourceMappingURL=account-my-post.js.map