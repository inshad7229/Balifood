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
/**
 * Generated class for the EventPhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventPhotosPage = /** @class */ (function () {
    function EventPhotosPage(securityProvider, navCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.event_id = this.navParams.get('event_id');
    }
    EventPhotosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventPhotosPage');
    };
    EventPhotosPage.prototype.ngOnInit = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.MyEvent(a)
            .subscribe(function (data) {
            var a = data;
            var evn = a.userEvents.filter(function (arg) { return _this.change(arg._id) == _this.event_id; });
            if (evn.length > 0) {
                _this.eventPhotos = evn;
                // alert(JSON.stringify(evn));
            }
            console.log("data" + JSON.stringify(data));
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    EventPhotosPage.prototype.change = function (id) {
        if (id) {
            return id;
        }
    };
    EventPhotosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-event-photos',
            templateUrl: 'event-photos.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, NavController, NavParams])
    ], EventPhotosPage);
    return EventPhotosPage;
}());
export { EventPhotosPage };
//# sourceMappingURL=event-photos.js.map