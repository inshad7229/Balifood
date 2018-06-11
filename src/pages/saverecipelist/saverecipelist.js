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
var SaverecipelistPage = /** @class */ (function () {
    function SaverecipelistPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.count = 0;
        this.list = 'true';
        this.pop_div = 'false';
        this.post = this.navParams.get('post');
        var a = this.navParams.get('savedetail');
        console.log("g" + JSON.stringify(this.savedetail));
        var data = a.filter(function (arg) { return arg.recipe_detail != null; });
        if (data.length > 0) {
            this.savedetail = data;
            this.savedetail2 = data;
        }
    }
    SaverecipelistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SaverecipelistPage');
    };
    SaverecipelistPage.prototype.onNewRecipe = function () {
        this.pop_div = 'false';
        this.navCtrl.push('NewRecipesPage');
    };
    SaverecipelistPage.prototype.onIconlist = function () {
        this.list = 'false';
    };
    SaverecipelistPage.prototype.onIcongrid = function () {
        this.list = 'true';
    };
    SaverecipelistPage.prototype.onViewDetail = function (recipe_id, recipe_data) {
        this.pop_div = 'false';
        this.navCtrl.push('SaveRecipeDetailPage', { recipe_data: recipe_data, post: this.post });
    };
    SaverecipelistPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-saverecipelist',
            templateUrl: 'saverecipelist.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SaverecipelistPage);
    return SaverecipelistPage;
}());
export { SaverecipelistPage };
//# sourceMappingURL=saverecipelist.js.map