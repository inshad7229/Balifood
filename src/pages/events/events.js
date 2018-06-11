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
import { TranslateService } from '@ngx-translate/core';
var EventsPage = /** @class */ (function () {
    function EventsPage(securityProvider, navCtrl, navParams, translate) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.count = 0;
        this.translate.use(localStorage['language']);
        this.event = 'past';
        this.pop_div = 'false';
        this.existing = this.navParams.get('existing');
        if (this.existing) {
        }
    }
    EventsPage.prototype.ionViewWillEnter = function () {
    };
    EventsPage.prototype.onPop = function () {
        this.count++;
        if (this.count % 2 != 0) {
            this.pop_div = 'true';
        }
        else {
            this.pop_div = 'false';
        }
    };
    EventsPage.prototype.doYourStuff = function () {
        // alert('cowabonga');
        this.navCtrl.pop(); // remember to put this to add the back button behavior
    };
    EventsPage.prototype.onMutualEvent = function () {
        this.navCtrl.push('CreateMutualEventPage');
        this.pop_div = 'false';
    };
    EventsPage.prototype.OnEvents = function (data) {
        if (this.existing) {
            this.navCtrl.push('GetEventMenuPage', { eventData: data });
        }
        else {
            this.navCtrl.push('MyEventsPage', { eventData: data });
        }
    };
    EventsPage.prototype.onMyEvent = function () {
        this.navCtrl.push('CreateMyEventsPage');
        this.pop_div = 'false';
    };
    EventsPage.prototype.ngOnInit = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.MyEvent(a)
            .subscribe(function (data) {
            var a = data;
            if (a.success == true) {
                _this.userEvents = a.userEvents;
                _this.compare();
                _this.upcomingCompare();
                _this.todayCompare();
            }
            console.log("data" + JSON.stringify(data));
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    EventsPage.prototype.compare = function () {
        var _this = this;
        var a = new Date().toISOString();
        var b = this.change(a);
        console.log("new" + a);
        var data = this.userEvents.filter(function (arg) { return _this.change(arg.date) < b; });
        if (data.length > 0) {
            console.log("compare_date" + JSON.stringify(data));
            this.PastEvent = data;
        }
        else {
            console.log("compare_date1" + JSON.stringify(data));
        }
    };
    EventsPage.prototype.upcomingCompare = function () {
        var _this = this;
        var a = new Date().toISOString();
        console.log("new" + a);
        var b = this.change(a);
        var data = this.userEvents.filter(function (arg) { return _this.change(arg.date) > b; });
        if (data.length > 0) {
            console.log("compare_date" + JSON.stringify(data));
            this.upcomingEvent = data;
        }
        else {
            console.log("compare_date1" + JSON.stringify(data));
        }
    };
    EventsPage.prototype.todayCompare = function () {
        var _this = this;
        var a = new Date().toISOString();
        console.log("new" + a);
        var b = a.split('T');
        var c = b[0];
        var data = this.userEvents.filter(function (arg) { return _this.fun(arg.date) == c; });
        if (data.length > 0) {
            console.log("compare_date" + JSON.stringify(data));
            this.todayEvent = data;
        }
        else {
            console.log("compare_date1" + JSON.stringify(data));
        }
    };
    EventsPage.prototype.change = function (date) {
        var a = date.split('T');
        return a[0];
    };
    EventsPage.prototype.fun = function (date) {
        var a = date.split('T');
        return a[0];
    };
    EventsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-events',
            templateUrl: 'events.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, NavController, NavParams, TranslateService])
    ], EventsPage);
    return EventsPage;
}());
export { EventsPage };
//# sourceMappingURL=events.js.map