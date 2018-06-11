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
import { LoadingController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/security/security';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
var AccountPage = /** @class */ (function () {
    function AccountPage(loadingCtrl, modalCtrl, securityProvider, navCtrl, navParams, translate) {
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.contactListArray = [];
        this.value = 0;
        this.offsetData = 0;
        this.listclass = 'list-view';
        this.list = 'true';
        this.activefreind = '';
        this.activePost = '';
        this.activeinvite = '';
        this.user_id = localStorage['user_id'];
        this.translate.use(localStorage['language']);
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (localStorage['contact_data']) {
            this.contacts = JSON.parse(localStorage['contact_data']);
            this.value = this.value;
            this.forContact();
            this.value++;
        }
        //console.log('ionViewDidLoad AccountPage');
        setTimeout(function () {
            _this.ionViewDidLoad();
        }, 1000);
    };
    AccountPage.prototype.forContact = function () {
        if (this.contacts) {
            if (this.value == 1) {
                for (var _i = 0, _a = this.contacts; _i < _a.length; _i++) {
                    var a = _a[_i];
                    for (var _b = 0, _c = a._objectInstance.phoneNumbers; _b < _c.length; _b++) {
                        var b = _c[_b];
                        var d = b.value;
                        var e = d.replace(" ", "");
                        this.contactListArray.push(e);
                    }
                }
            }
        }
    };
    AccountPage.prototype.ngOnInit = function () {
        var _this = this;
        this.alluser();
        this.allRecipe();
        this.username = this.username;
        this.user_image = this.user_image;
        console.log('img' + this.user_image);
        var a = localStorage['user_id'];
        this.securityProvider.MyRecipe(a)
            .subscribe(function (data) {
            //        console.log("cat_data" + JSON.stringify(data));
            _this.Category = data.recipes;
        }),
            setTimeout(function () {
                _this.ngOnInit();
            }, 10000);
        (function (error) { });
    };
    AccountPage.prototype.alluser = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.AllUserFriend(a)
            .subscribe(function (data) {
            var c = data;
            _this.alluserdata = c.allUsers;
            _this.userimg();
            var filterdata = _this.alluserdata.filter(function (arg) { return arg._id == a; });
            console.log("data" + JSON.stringify(filterdata));
            if (filterdata.length > 0) {
                _this.user_image = filterdata[0].profileImage;
                _this.username = filterdata[0].username;
            }
        });
    };
    AccountPage.prototype.userimg = function () {
        var a = localStorage['user_id'];
        if (this.alluserdata) {
            // code...
            var filterdata = this.alluserdata.filter(function (arg) { return arg._id == a; });
            // console.log("datafilter" + JSON.stringify(filterdata))
            if (filterdata.length > 0) {
                if (filterdata[0].profileImage) {
                    return filterdata[0].profileImage;
                    ;
                }
                else {
                    return 'assets/imgs/profiler.png';
                }
            }
            else {
                return 'assets/imgs/profiler.png';
            }
        }
    };
    AccountPage.prototype.onIconlist = function () {
        this.listclass = 'grid-view';
        this.list = 'false';
    };
    AccountPage.prototype.onIcongrid = function () {
        this.listclass = 'list-view';
        this.list = 'true';
    };
    AccountPage.prototype.onSetting = function () {
        this.navCtrl.push('SettingsPage');
    };
    AccountPage.prototype.onEditProfile = function () {
        var _this = this;
        var modal = this.modalCtrl.create('EditProfilePage', {
            user_image: this.user_image,
            username: this.username
        });
        modal.onDidDismiss(function (data) {
            if (data) {
                console.log("data" + JSON.stringify(data));
                var a = data;
                delete localStorage['user_image'];
                delete localStorage['username'];
                localStorage['user_image'] = a.user_image;
                localStorage['username'] = a.username;
                console.log("this.user_image" + _this.user_image);
                _this.ngOnInit();
            }
        });
        modal.present();
    };
    AccountPage.prototype.onfriendlink = function () {
        this.activefreind = 'activefreind';
        this.activePost = '';
        this.activeinvite = '';
        this.navCtrl.push('AccountFriendsPage');
    };
    AccountPage.prototype.contactImported = function (contactListArray) {
        var a = {
            user_id: localStorage['user_id'],
            contacts: contactListArray
        };
        this.securityProvider.ContactImport(a)
            .subscribe(function (data) {
            var a = data;
        }),
            function (err) {
                alert("err" + err);
            };
    };
    AccountPage.prototype.onMyPost = function () {
        this.activefreind = '';
        this.activePost = 'activePost';
        this.activeinvite = '';
        this.navCtrl.push('AccountMyPostPage');
    };
    AccountPage.prototype.onInviteFriend = function () {
        this.activefreind = '';
        this.activePost = '';
        this.activeinvite = 'activeinvite';
        this.navCtrl.push('AccountInviteFriendsPage');
    };
    AccountPage.prototype.allRecipe = function () {
        var _this = this;
        this.securityProvider.MainRecipe(this.offsetData)
            .subscribe(function (data) {
            _this.dataa = data.Recipes;
            _this.getStatusFOrdisabled();
        }),
            function (error) { };
    };
    AccountPage.prototype.getStatusFOrdisabled = function () {
        var _this = this;
        if (this.dataa) {
            var data = this.dataa.filter(function (arg) { return _this.user_id == arg.user_id && arg.categories != "Others"; });
            if (data.length > 0) {
                this.mypost = data;
            }
            else {
                console.log("data1" + JSON.stringify(data));
            }
        }
    };
    AccountPage.prototype.onViewDetail = function (recipe_id, recipe_data) {
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
    AccountPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-account',
            templateUrl: 'account.html',
        }),
        __metadata("design:paramtypes", [LoadingController, ModalController, SecurityProvider, NavController, NavParams, TranslateService])
    ], AccountPage);
    return AccountPage;
}());
export { AccountPage };
//# sourceMappingURL=account.js.map