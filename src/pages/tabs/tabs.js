var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
var TabsPage = /** @class */ (function () {
    function TabsPage(securityProvider, navCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1Root = 'MainPage';
        this.tab2Root = 'NotificationPage';
        this.tab3Root = 'EventsPage';
        this.tab4Root = 'MyRecipesPage';
        this.tab5Root = 'AccountPage';
        this.userRegisterFirstTime = this.navParams.get('userRegisterFirstTime');
    }
    __decorate([
        ViewChild('myTabs'),
        __metadata("design:type", Tabs)
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html'
        }),
        __metadata("design:paramtypes", [SecurityProvider, NavController, NavParams])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map