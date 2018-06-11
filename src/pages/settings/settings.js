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
import { FCM } from "@ionic-native/fcm";
import { IonicPage, NavController, NavParams, Config, AlertController, ActionSheetController, Platform, LoadingController } from "ionic-angular";
import { SocialSharing } from "@ionic-native/social-sharing";
import { ToastController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Facebook } from "@ionic-native/facebook";
import { Contacts } from "@ionic-native/contacts";
import { Observable } from "rxjs/Rx";
import { SecurityProvider } from "../../providers/security/security";
var SettingsPage = /** @class */ (function () {
    function SettingsPage(loadingCtrl, securityProvider, contacts, fb, platform, translate, toastCtrl, actionSheetCtrl, alertCtrl, config, navCtrl, navParams, socialSharing, fcm) {
        this.loadingCtrl = loadingCtrl;
        this.securityProvider = securityProvider;
        this.contacts = contacts;
        this.fb = fb;
        this.platform = platform;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.config = config;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.fcm = fcm;
        this.contactListArray = [];
        this.contactNames = [];
        this.toggleFlag = 0;
        this.lang = true;
        this.contactvalue = false;
        this.translate.use(localStorage["language"]);
        this.pepperoni = false;
        //alert(localStorage['private']);
        if (localStorage['private'] == 1) {
            this.pepperoni = true;
        }
        this.toggleFlag = 1;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad SettingsPage");
    };
    SettingsPage.prototype.onContact = function () {
        this.navCtrl.push("ContactusPage");
    };
    SettingsPage.prototype.onFaq = function () {
        this.navCtrl.push("FaqPage");
    };
    SettingsPage.prototype.onAbout = function () {
        this.navCtrl.push("AboutusPage");
    };
    SettingsPage.prototype.onLogout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            message: "Do you want to logout ?",
            buttons: [
                {
                    text: "No",
                    handler: function () {
                        console.log("Disagree clicked");
                    }
                },
                {
                    text: "Yes",
                    handler: function () {
                        console.log("Agree clicked");
                        _this.onconfirm();
                    }
                }
            ]
        });
        confirm.present();
    };
    SettingsPage.prototype.onconfirm = function () {
        localStorage.clear();
        this.config.set("pageTransition", "ios-transition");
        this.config.set("tabsHideOnSubPages", false);
        this.navCtrl.push("FirstPage", { logout: "logout" });
        this.navCtrl.parent.select(0);
        this.fb
            .logout()
            .then(function (res) { })
            .catch(function (e) { });
    };
    SettingsPage.prototype.onTerm = function () {
        this.navCtrl.push("TermsConditionsPage");
    };
    SettingsPage.prototype.onAboutUs = function () {
        this.navCtrl.push("AboutusPage");
    };
    SettingsPage.prototype.titleCase = function (str) {
        str = str.toLowerCase().split(" ");
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(" ");
    };
    SettingsPage.prototype.onTogglePrivacy = function (flag) {
        var _this = this;
        var settingMessage;
        this.translate.get('settingtext').subscribe(function (res) { settingMessage = res; });
        if (flag == true) {
            var alert_1 = this.alertCtrl.create({
                title: 'Make account private?',
                message: settingMessage,
                buttons: [
                    {
                        text: 'Disagree',
                        role: 'cancel',
                        handler: function () {
                            _this.pepperoni = false;
                            localStorage['private'] = 0;
                        }
                    },
                    {
                        text: 'Agree',
                        handler: function () {
                            var loading = _this.loadingCtrl.create({
                                content: 'Please wait...'
                            });
                            Observable.fromPromise(loading.present())
                                .flatMap(function (data) { return _this.securityProvider.togglePrivacy(localStorage['user_id']); })
                                .subscribe(function (data) {
                                return loading.dismiss().then(function () {
                                    var a = data;
                                    if (a.success == true || a.success == 'true') {
                                        var alert_2 = _this.alertCtrl.create({
                                            subTitle: _this.titleCase(a.message),
                                            buttons: ['OK']
                                        });
                                        alert_2.present();
                                        if (a.message == 'your account is private now') {
                                            localStorage['private'] = 1;
                                            _this.pepperoni = true;
                                            _this.toggleFlag = 0;
                                        }
                                        else {
                                            _this.pepperoni = false;
                                        }
                                    }
                                });
                            }, function (error) {
                                return loading.dismiss().then(function () {
                                    var alert = _this.alertCtrl.create({
                                        title: 'Alert!',
                                        subTitle: 'Something went wrong!',
                                        buttons: ['OK']
                                    });
                                    alert.present();
                                });
                            });
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            var alert_3 = this.alertCtrl.create({
                title: 'Make account public?',
                message: 'Your posts will be available publically now.',
                buttons: [
                    {
                        text: 'Disagree',
                        role: 'cancel',
                        handler: function () {
                            _this.pepperoni = false;
                            localStorage['private'] = 0;
                        }
                    },
                    {
                        text: 'Agree',
                        handler: function () {
                            var loading = _this.loadingCtrl.create({
                                content: 'Please wait...'
                            });
                            Observable.fromPromise(loading.present())
                                .flatMap(function (data) { return _this.securityProvider.togglePrivacy(localStorage['user_id']); })
                                .subscribe(function (data) {
                                return loading.dismiss().then(function () {
                                    var a = data;
                                    if (a.success == true || a.success == 'true') {
                                        var alert_4 = _this.alertCtrl.create({
                                            subTitle: _this.titleCase(a.message),
                                            buttons: ['OK']
                                        });
                                        alert_4.present();
                                        if (a.message == 'your account is public now') {
                                            localStorage['private'] = 0;
                                            _this.pepperoni = false;
                                        }
                                        else {
                                            _this.pepperoni = true;
                                        }
                                    }
                                });
                            }, function (error) {
                                return loading.dismiss().then(function () {
                                    var alert = _this.alertCtrl.create({
                                        title: 'Alert!',
                                        subTitle: 'Something went wrong!',
                                        buttons: ['OK']
                                    });
                                    alert.present();
                                });
                            });
                        }
                    }
                ]
            });
            alert_3.present();
        }
    };
    SettingsPage.prototype.onLanguageChange = function (language) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Choose Language",
            cssClass: "action-sheets-groups-page",
            buttons: [
                {
                    text: "English",
                    role: "destructive",
                    icon: "md-globe",
                    handler: function () {
                        _this.translate.use("en");
                        localStorage["language"] = "en";
                    }
                },
                {
                    text: "עברית",
                    icon: "md-globe",
                    handler: function () {
                        _this.translate.use("heb");
                        localStorage["language"] = "heb";
                        console.log("Facebook clicked");
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel",
                    icon: "close",
                    handler: function () {
                        console.log("Cancel clicked");
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SettingsPage.prototype.share = function () {
        var message = "Shared by baliFood App";
        var subject = "Balifood";
        var file = "http://titan.promaticstechnologies.com/Y1MM/img/shiftimage/2452shiftimag1.jpg";
        var url = "https://www.dropbox.com/s/796mk502mbpee64/android-debug.apk?dl=0";
        this.socialSharing
            .share(message, subject, file, url)
            .then(function (data) { })
            .catch(function (error) { });
    };
    SettingsPage.prototype.onShareWith = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Share with",
            cssClass: "action-sheets-groups-page",
            buttons: [
                {
                    text: "Instagram",
                    role: "destructive",
                    icon: "logo-instagram",
                    handler: function () {
                        _this.onInsta();
                        console.log("Instagram clicked");
                    }
                },
                {
                    text: "Facebook",
                    icon: "logo-facebook",
                    handler: function () {
                        _this.onFb();
                        console.log("Facebook clicked");
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel",
                    icon: "close",
                    handler: function () {
                        console.log("Cancel clicked");
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SettingsPage.prototype.onFb = function () {
        var toast = this.toastCtrl.create({
            message: "Message has been copied to clipboard you can paste on Facebook!",
            duration: 2000,
            position: "bottom"
        });
        toast.present(toast);
        var message = "Shared by baliFood App";
        var subject = "Balifood";
        var image = "http://titan.promaticstechnologies.com/Y1MM/img/shiftimage/2452shiftimag1.jpg";
        var url = "www.balifoodapplink.com";
        this.socialSharing
            .shareViaFacebook(message, null, "https://www.dropbox.com/s/796mk502mbpee64/android-debug.apk?dl=0")
            .then(function () { })
            .catch(function () { });
    };
    SettingsPage.prototype.onInsta = function () {
        var toast = this.toastCtrl.create({
            message: "Message has been copied to clipboard you can paste on instagram!",
            duration: 2000,
            position: "bottom"
        });
        toast.present(toast);
        var message = "Shared by baliFood App";
        var subject = "Balifood";
        var image = "http://titan.promaticstechnologies.com/Y1MM/img/shiftimage/2452shiftimag1.jpg";
        var url = "www.balifoodapplink.com";
        this.socialSharing
            .shareViaInstagram(message + " " + url, image)
            .then(function () { })
            .catch(function () { });
    };
    SettingsPage.prototype.onContactimport = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
        this.onUpdateContacts();
        this.contacts.find(["displayName", "name", "phoneNumbers"]).then(function (data) {
            var a = data;
            _this.allContacts = data;
            //alert(JSON.stringify(this.allContacts));
            if (data) {
                //  alert(JSON.stringify(data));
                console.log("contact imported");
                localStorage["contact_data"] = data;
                //alert(JSON.stringify(this.allContacts));
                var toast = _this.toastCtrl.create({
                    message: "Contact Imported successfully!",
                    duration: 2000,
                    position: "bottom"
                });
                toast.present(toast);
                for (var _i = 0, _a = _this.allContacts; _i < _a.length; _i++) {
                    var a_1 = _a[_i];
                    if (a_1._objectInstance.phoneNumbers != null) {
                        for (var _b = 0, _c = a_1._objectInstance.phoneNumbers; _b < _c.length; _b++) {
                            var b = _c[_b];
                            var d = b.value;
                            // alert(d);
                            // var e=d.replace(/\s/g, "");
                            // var f=e.substring(e.length - 10, e.length)
                            var f = d.replace(/\D/g, "");
                            _this.contactListArray.push({ number: f, name: a_1.displayName });
                            //alert(this.contactListArray[0]);
                            _this.contactNames.push({ number: f, name: a_1.displayName });
                            _this.contactvalue = true;
                        }
                    }
                }
                loader.dismiss();
                // alert("hjello");
                //alert(this.contactListArray.toString());
                //alert('hello');
                // alert(JSON.stringify(this.contactListArray));
                //alert(JSON.stringify(this.contactNames));
                //alert(JSON.stringify(this.contactNames));
                localStorage["contact_array"] = JSON.stringify(_this.contactListArray);
                localStorage["contactNames"] = JSON.stringify(_this.contactNames);
            }
        });
    };
    SettingsPage.prototype.removeDuplicates = function (originalArray, prop) {
        var newArray = [];
        var lookupObject = {};
        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }
        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    };
    SettingsPage.prototype.onUpdateContacts = function () {
        var _this = this;
        if (this.contactvalue) {
            var unique = Array.from(this.removeDuplicates(this.contactListArray, "number"));
            var a = {
                user_id: localStorage["user_id"],
                contacts: unique
            };
            this.securityProvider.ContactImport(a).subscribe(function (data) {
                //alert("data"+JSON.stringify(data));
            }),
                function (err) {
                    alert("err" + err);
                };
        }
        else {
            setTimeout(function () {
                _this.onUpdateContacts();
            }, 1000);
        }
    };
    SettingsPage.prototype.onNotification = function () {
        var _this = this;
        var check1 = false;
        var check2 = false;
        if (localStorage['notifications'] == 1) {
            check1 = true;
        }
        else {
            check2 = true;
        }
        if (!localStorage["notifications"]) {
            check1 = true;
            check2 = false;
        }
        var prompt = this.alertCtrl.create({
            title: 'Notification Settings',
            inputs: [
                {
                    type: 'radio',
                    label: 'Enable Notifications',
                    value: '1',
                    checked: check1
                },
                {
                    type: 'radio',
                    label: 'Disable Notifications',
                    value: '0',
                    checked: check2
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) {
                        console.log("cancel clicked");
                    }
                },
                {
                    text: "Save Settings",
                    handler: function (data) {
                        if (data == 1) {
                            localStorage["notifications"] = 1;
                            _this.fcm.subscribeToTopic("Balifood");
                        }
                        else {
                            localStorage["notifications"] = 0;
                            _this.fcm.unsubscribeFromTopic("Balifood");
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    SettingsPage.prototype.onApplication = function () { };
    SettingsPage.prototype.onChangePassword = function () {
        this.navCtrl.push("ChangePasswordPage");
    };
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: "page-settings",
            templateUrl: "settings.html"
        }),
        __metadata("design:paramtypes", [LoadingController,
            SecurityProvider,
            Contacts,
            Facebook,
            Platform,
            TranslateService,
            ToastController,
            ActionSheetController,
            AlertController,
            Config,
            NavController,
            NavParams,
            SocialSharing,
            FCM])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map