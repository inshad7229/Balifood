var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { NavController, IonicPage, LoadingController, AlertController, Config, Platform } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { SecurityProvider } from "../../providers/security/security";
import { TabsPage } from "../tabs/tabs";
import { FormBuilder, Validators } from "@angular/forms";
import { FCM } from "@ionic-native/fcm";
import { Device } from "@ionic-native/device";
import { TranslateService } from "@ngx-translate/core";
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, device, fcm, loadingCtrl, config, navParams, formBuilder, securityProvider, navCtrl, alertCtrl, translate) {
        this.platform = platform;
        this.device = device;
        this.fcm = fcm;
        this.loadingCtrl = loadingCtrl;
        this.config = config;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.login = {};
        this.email = "";
        this.password = "";
        this.type = "text";
        this.logout = this.navParams.get("logout");
        if (this.logout) {
            alert(this.logout);
            this.navCtrl.push("LoginPage");
        }
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.loginform = formBuilder.group({
            emailaddress: [
                "",
                Validators.compose([
                    Validators.maxLength(50),
                    Validators.pattern(emailRegex),
                    Validators.required
                ])
            ],
            pass: [
                "",
                Validators.compose([
                    Validators.maxLength(12),
                    Validators.minLength(3),
                    Validators.pattern(""),
                    Validators.required
                ])
            ]
        });
    }
    LoginPage.prototype.signup = function () {
        this.navCtrl.push("SignupPage");
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        this.fcm.subscribeToTopic("Balifood");
        console.log("ionViewDidLoad LoginPage");
    };
    LoginPage.prototype.ngOnInit = function () {
        // alert('Device UUID is: ' + this.device.uuid);
        // alert('platform is: ' + this.device.platform);
    };
    LoginPage.prototype.onHide = function () {
        this.type = "password";
    };
    LoginPage.prototype.onShow = function () {
        this.type = "text";
    };
    LoginPage.prototype.onlogin = function () {
        var _this = this;
        // this.platform.ready().then(() => {
        //   this.fcm.getToken().then(token => {
        //   this.token = token;
        this.token = "1234";
        if (this.token) {
            this.login = {
                email: this.email.toLowerCase(),
                password: this.password,
                deviceToken: this.token
            };
            var loading_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.securityProvider.loginopen(_this.login); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    var a = data;
                    if (a.success == true) {
                        var b = a.userdata;
                        var c = b.email;
                        localStorage["authh"] = 1;
                        localStorage["email"] = c;
                        localStorage["user_id"] = b._id;
                        localStorage["password"] = b.password;
                        localStorage["username"] = b.username;
                        localStorage["user_image"] = b.profileImage;
                        localStorage["private"] = b.privateAccountStatus;
                        console.log("email" + c);
                        _this.navCtrl.setRoot(TabsPage);
                    }
                    else {
                        if (a.message) {
                            var alert_1 = _this.alertCtrl.create({
                                title: _this.translateService.instant('popup.tilte'),
                                subTitle: _this.translateService.instant(a.message),
                                buttons: [_this.translateService.instant('popup.ok')]
                            });
                            alert_1.present();
                        }
                        else {
                            var alert_2 = _this.alertCtrl.create({
                                title: _this.translateService.instant('popup.tilte'),
                                subTitle: _this.translateService.instant('popup.Something'),
                                buttons: [_this.translateService.instant('popup.ok')]
                            });
                            alert_2.present();
                        }
                        localStorage["authh"] = 0;
                        localStorage["email"] = "";
                    }
                });
            }, function (error) {
                return loading_1.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: _this.translateService.instant('popup.tilte'),
                        subTitle: _this.translateService.instant('popup.Something'),
                        buttons: [_this.translateService.instant('popup.ok')]
                    });
                    alert.present();
                });
            });
        }
        else {
            alert("token not generated");
        }
        // });
        // });
    };
    LoginPage.prototype.onForgot = function () {
        this.navCtrl.push("ForgetPasswordPage");
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: "page-login",
            templateUrl: "login.html"
        }),
        __metadata("design:paramtypes", [Platform,
            Device,
            FCM,
            LoadingController,
            Config,
            NavParams,
            FormBuilder,
            SecurityProvider,
            NavController,
            AlertController,
            TranslateService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map