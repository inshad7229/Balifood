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
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, Validators } from '@angular/forms';
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(platform, fcm, formBuilder, alertCtrl, securityProvider, navCtrl) {
        this.platform = platform;
        this.fcm = fcm;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.signup = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var nameReg = /^([a-zA-Z0-9._-]){2,30}$/;
        var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
        this.salonregister = formBuilder.group({
            name: ['', Validators.compose([Validators.pattern(nameReg), Validators.required])],
            useremail: ['', Validators.compose([
                    Validators.pattern(emailRegex), Validators.required
                ])],
            pass: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(3), Validators.pattern(''), Validators.required])],
            cpass: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(3), Validators.pattern(''), Validators.required])],
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        this.fcm.subscribeToTopic('Balifood');
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.onSignup = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.fcm.getToken().then(function (token) {
                _this.token = token;
                if (_this.token) {
                    var a = _this.signup.contactNumber.replace(/\D/g, '');
                    if (_this.confirmPassword == _this.signup.password) {
                        _this.signup = {
                            username: _this.signup.username,
                            email: _this.signup.email.toLowerCase(),
                            password: _this.signup.password,
                            contactNumber: a,
                            deviceToken: _this.token,
                        };
                        if (_this.remembers == true || _this.remembers == 'true' || _this.remembers == "true") {
                            _this.securityProvider.signupopen(_this.signup)
                                .subscribe(function (data) {
                                var a = data;
                                if (a.success == 'true' || a.success == true || a.success == "true") {
                                    var b = a.userData;
                                    var email = b.email;
                                    var password = b.password;
                                    _this.userRegisterFirstTime = 1;
                                    // this.navCtrl.push('LoginPage');
                                    _this.onlogin(email, password);
                                }
                                else {
                                    var alert_1 = _this.alertCtrl.create({
                                        title: 'Alert!',
                                        subTitle: a.msg,
                                        buttons: ['OK']
                                    });
                                    alert_1.present();
                                }
                                console.log("data" + JSON.stringify(data));
                            }),
                                function (error) {
                                    var alert = _this.alertCtrl.create({
                                        title: 'Alert!',
                                        subTitle: 'Something went wrong!',
                                        buttons: ['OK']
                                    });
                                    alert.present();
                                };
                        }
                        else {
                            var alert_2 = _this.alertCtrl.create({
                                title: 'Alert!',
                                subTitle: 'Please accept terms & conditions',
                                buttons: ['OK']
                            });
                            alert_2.present();
                        }
                    }
                    else {
                        var alert_3 = _this.alertCtrl.create({
                            title: 'Alert!',
                            subTitle: 'Password not matched!',
                            buttons: ['OK']
                        });
                        alert_3.present();
                    }
                }
            });
        });
    };
    SignupPage.prototype.onTerms = function () {
        this.navCtrl.push('TermsConditionsPage');
    };
    SignupPage.prototype.onlogin = function (email, password) {
        var _this = this;
        var login = {
            email: email,
            password: password,
            deviceToken: this.token,
        };
        this.securityProvider.loginopen(login)
            .subscribe(function (data) {
            console.log("data" + JSON.stringify(data));
            var a = data;
            if (a.success == true) {
                var b = a.userdata;
                var c = b.email;
                localStorage['authh'] = 1;
                localStorage['email'] = c;
                localStorage['user_id'] = b._id;
                localStorage['password'] = b.password;
                localStorage['username'] = b.username;
                localStorage['user_image'] = b.profileImage;
                console.log('email' + c);
                _this.navCtrl.setRoot(TabsPage, {
                    userRegisterFirstTime: _this.userRegisterFirstTime
                });
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: 'Please enter email or password !',
                    buttons: ['OK']
                });
                alert_4.present();
                localStorage['authh'] = 0;
                localStorage['email'] = '';
            }
        }),
            function (error) { };
    };
    SignupPage.prototype.getStatusFOrdisabled = function (cpass) {
        if (cpass == this.signup.password) {
            return true;
        }
        else {
            return false;
        }
    };
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [Platform, FCM, FormBuilder, AlertController, SecurityProvider, NavController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map