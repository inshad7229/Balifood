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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
var NotificationPage = /** @class */ (function () {
    function NotificationPage(securityProvider, navCtrl, navParams, loadingCtrl) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.mergeNotify = [];
    }
    NotificationPage.prototype.ngOnInit = function () {
        var _this = this;
        this.mergeNotify = [];
        this.GetNotification();
        this.friendNotification();
        setTimeout(function () {
            _this.ngOnInit();
        }, 50000);
    };
    NotificationPage.prototype.GetNotification = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.GetNotification(a)
            .subscribe(function (data) {
            var a = data;
            _this.Notification = a.notifications.reverse();
            // for(let a of Notification){
            //  this.mergeNotify.push(a);
            // }
        }),
            function (error) { };
    };
    NotificationPage.prototype.friendNotification = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.GetFreindNotification(a)
            .subscribe(function (data) {
            var a = data;
            _this.friendRequestsNotification = a.friendRequests;
        }),
            function (error) { };
    };
    NotificationPage.prototype.getOrderData = function (array) {
        array.sort(function (a, b) { return b.createdDate - a.createdDate; });
        return array;
    };
    NotificationPage.prototype.onAcceptRequest = function (requester, status) {
        var _this = this;
        ////status=1/accept, status=2/reject/////////
        var a = {
            requester: requester,
            recipient: localStorage['user_id'],
            status: status
        };
        this.securityProvider.acceptOrRejectFriendRequest(a)
            .subscribe(function (data) {
            var a = data;
            console.log("a" + JSON.stringify(a));
            _this.ngOnInit();
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    NotificationPage.prototype.onAcceptRequestInvitation = function (eventId, notification_id, status) {
        var _this = this;
        if (status == 1) {
            var s = 'Confirmed';
        }
        else {
            var s = 'Cancelled';
        }
        var a = {
            eventId: eventId,
            member_id: localStorage['user_id'],
            status: s,
            notificationId: notification_id
        };
        this.securityProvider.acceptOrRejectRequest(a)
            .subscribe(function (data) {
            var a = data;
            console.log("a" + JSON.stringify(a));
            _this.ngOnInit();
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    NotificationPage.prototype.onAcceptRequestInvitationForBringItems = function (eventId, notification_id, status, whatToBringId) {
        var _this = this;
        if (status == 1) {
            var s = 'Confirmed';
        }
        else {
            var s = 'Cancelled';
        }
        var a = {
            eventId: eventId,
            whatToBringId: whatToBringId,
            status: s,
            notificationId: notification_id,
            member_id: localStorage['user_id'],
            username: localStorage['username']
        };
        this.securityProvider.onAcceptRequestInvitationForBringItems(a)
            .subscribe(function (data) {
            var a = data;
            console.log("a" + JSON.stringify(a));
            _this.ngOnInit();
        }),
            function (error) {
                console.log("err" + JSON.stringify(error));
            };
    };
    NotificationPage.prototype.allimg = function (img) {
        if (img) {
            return img;
        }
        else {
            return 'assets/imgs/profile_img.png';
        }
    };
    NotificationPage.prototype.funDate = function (date) {
        if (date) {
            var a = date.split(" ");
            return a[1] + " " + a[2] + " " + a[3];
        }
    };
    NotificationPage.prototype.change = function (data) {
        var a = data.filter(function (arg) { return arg == localStorage['user_id']; });
        if (a.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    NotificationPage.prototype.goToEvent = function (eventid) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.thisEvent(eventid); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                localStorage['event_id'] = eventid;
                if (a.success == true) {
                    _this.eventData = a.eventData;
                    _this.navCtrl.push('MyEventsPage', { eventData: a.eventData, lastPage: 'notifications' });
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    NotificationPage.prototype.millisecondsToStr = function (milliseconds) {
        milliseconds = new Date(milliseconds).getTime();
        var mstoday = new Date().getTime();
        milliseconds = mstoday - milliseconds;
        function numberEnding(number) {
            return (number > 1) ? 's' : '';
        }
        var temp = Math.floor(milliseconds / 1000);
        var years = Math.floor(temp / 31536000);
        if (years) {
            return years + ' year' + numberEnding(years) + " ago";
        }
        //TODO: Months! Maybe weeks? 
        var days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            return days + ' day' + numberEnding(days) + " ago";
        }
        var hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return hours + ' hour' + numberEnding(hours) + " ago";
        }
        var minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return minutes + ' minute' + numberEnding(minutes) + " ago";
        }
        var seconds = temp % 60;
        if (seconds) {
            return seconds + ' second' + numberEnding(seconds) + " ago";
        }
        return 'less than a second ago'; //'just now' //or other string you like;
    };
    NotificationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-notification',
            templateUrl: 'notification.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, NavController, NavParams, LoadingController])
    ], NotificationPage);
    return NotificationPage;
}());
export { NotificationPage };
//# sourceMappingURL=notification.js.map