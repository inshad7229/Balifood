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
import { Observable } from 'rxjs/Rx';
import { IonicPage, NavController, NavParams, Content, ToastController, LoadingController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { TranslateService } from '@ngx-translate/core';
import { SecurityProvider } from '../../providers/security/security';
import { NgZone } from '@angular/core';
/**
 * Generated class for the EventChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventChatPage = /** @class */ (function () {
    function EventChatPage(navCtrl, loadingCtrl, securityProvider, navParams, ngzone, toastCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.securityProvider = securityProvider;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.chats = [];
        this.translate.use(localStorage['language']);
        this.eventData = this.navParams.get('event');
        this.zone = ngzone;
        this.me = localStorage['user_id'];
        this.chatinp = '';
        this.socket = io.connect('http://18.218.43.56:5002');
        this.socket.on('connect_failed', function (connect_failed) {
            var toast1 = _this.toastCtrl.create({
                message: 'Sorry, there seems to be an issue with the connection_failed!',
                duration: 3000,
                position: 'top'
            });
            toast1.onDidDismiss(function () {
                console.log('over');
            });
            toast1.present();
        });
        this.socket.emit('room join', {
            room_id: this.eventData._id,
            sender_id: localStorage['user_id']
        });
        this.socket.on('disconnect', function (disconnect) {
            var toast2 = _this.toastCtrl.create({
                message: 'Sorry, there seems to be an issue with the disconnection!',
                duration: 3000,
                position: 'top'
            });
            toast2.onDidDismiss(function () {
                console.log('over');
            });
            toast2.present();
        });
        this.socket.on('error', function (error) {
            var toast3 = _this.toastCtrl.create({
                message: 'Something Went Wrong!',
                duration: 3000,
                position: 'top'
            });
            toast3.onDidDismiss(function () {
                console.log('here ' + error + 'ERror' + JSON.stringify(error));
            });
            toast3.present();
        });
        this.socket.on('connecting', function (connecting) {
            var toast4 = _this.toastCtrl.create({
                message: 'Connecting With the Server!',
                duration: 3000,
                position: 'top'
            });
            toast4.onDidDismiss(function () {
                console.log('over');
            });
            toast4.present();
        });
        this.socket.on('message', function (msg) {
            _this.zone.run(function () {
                setTimeout(function () {
                    _this.content.scrollToBottom(0);
                }, 0);
                //	alert(msg)
                _this.chats.push(msg);
            });
        }, function (error) {
            alert('uncheck' + JSON.stringify(error));
        });
        this.socket.on('typeIn', function (msg) {
            _this.zone.run(function () {
                _this.typing = msg.sender_name + ' is typing...';
            });
        }, function (error) {
            // alert('uncheck'+JSON.stringify(error));
        });
        this.socket.on('connect', function (connect) {
            var toast7 = _this.toastCtrl.create({
                message: 'Connection Successful',
                duration: 3000,
                position: 'top'
            });
            toast7.onDidDismiss(function () {
                console.log('over');
            });
            toast7.present();
        });
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.EventChats(_this.eventData._id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                // alert(JSON.stringify(a));
                if (a.success == true) {
                    _this.chathistory = a.eventChat;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
        // alert(JSON.stringify(this.eventData));
    }
    EventChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventChatPage');
    };
    EventChatPage.prototype.sendTypeIn = function () {
        this.socket.emit('typeIn', {
            room_id: this.eventData._id,
            sender_id: localStorage['user_id'],
            send_name: localStorage['username']
        });
    };
    EventChatPage.prototype.send = function (msg) {
        if (msg != '') {
            this.socket.emit('message', {
                room_id: this.eventData._id,
                message: msg,
                sender_id: localStorage['user_id'],
                sender_name: localStorage['username']
            });
            //this.sendPush(localStorage['customer_sender_email'], localStorage['customer_reciever_email'], msg)
        }
        this.chatinp = '';
    };
    EventChatPage.prototype.getLiClassName = function (item) {
        if (item) {
            if (item.sender_id == this.me) {
                return "right";
            }
            else {
                return "left";
            }
        }
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], EventChatPage.prototype, "content", void 0);
    EventChatPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-event-chat',
            templateUrl: 'event-chat.html',
            providers: []
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, SecurityProvider, NavParams, NgZone, ToastController, TranslateService])
    ], EventChatPage);
    return EventChatPage;
}());
export { EventChatPage };
//# sourceMappingURL=event-chat.js.map