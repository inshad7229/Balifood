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
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { SecurityProvider } from '../providers/security/security';
import { FCM } from '@ionic-native/fcm';
import { AdMob } from '@ionic-native/admob';
;
var MyApp = /** @class */ (function () {
    function MyApp(fcm, securityProvider, alertCtrl, platform, statusBar, splashScreen, translate, admob) {
        //translate.setDefaultLang('en');
        var _this = this;
        this.fcm = fcm;
        this.securityProvider = securityProvider;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.admob = admob;
        if (localStorage['authh'] == 1) {
            this.rootPage = TabsPage;
        }
        else {
            this.rootPage = 'FirstPage';
        }
        platform.ready().then(function () {
            //this.showAdmobBannerAds();
            var admobid;
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = {
                    banner: 'ca-app-pub-9136331443790194/7121103168',
                    interstitial: 'ca-app-pub-9136331443790194/3138869390'
                };
            }
            else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
                admobid = {
                    banner: 'ca-app-pub-9136331443790194/7121103168',
                    interstitial: 'ca-app-pub-9136331443790194/3138869390'
                };
            }
            else {
                admobid = {
                    banner: 'ca-app-pub-9136331443790194/7121103168',
                    interstitial: 'ca-app-pub-9136331443790194/3138869390'
                };
            }
            _this.admob.createBanner({
                adId: admobid.banner,
                isTesting: true,
                position: _this.admob.AD_POSITION.BOTTOM_CENTER,
                overlap: false,
                autoShow: true
            });
            translate.setDefaultLang('en');
            //  alert(localStorage['language']);
            if (localStorage['language']) {
                translate.use(localStorage['language']);
            }
            fcm.onNotification().subscribe(function (data) {
                //alert("1"+JSON.stringify(data));
                if (data.wasTapped) {
                    console.log("Received in background");
                    //alert("2"+JSON.stringify(data));
                    //this.nav.push('ContactusPage'); 
                }
                else {
                    console.log("Received in foreground");
                    //alert("3"+JSON.stringify(data));
                    //this.nav.push('AccountPage'); 
                }
                ;
            });
            // platform.registerBackButtonAction((data)=>{ 
            //      if(this.nav.canGoBack()){
            //       this.nav.pop()
            //     }
            //     else{
            //       let alert=this.alertCtrl.create({
            //          title: 'Exit?',
            //  message: 'Do you want to exit the app?',
            //  buttons: [
            //    {
            //      text: 'Cancel',
            //      role: 'cancel',
            //      handler: () => {
            //      alert=null
            //      }
            //    },
            //    {
            //      text: 'Exit',
            //      handler: () => {
            //        platform.exitApp();
            //      }
            //    }
            //  ]
            //       })
            //       alert.present()
            //     }
            //   })
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    // ngOnInit(){
    //   var a=localStorage['user_id']
    //    this.securityProvider.UserActiveStatus(a)
    //     .subscribe(data => {
    //       var a=data;
    //       if (a.userStatus=="active" || a.userStatus=='active') {
    //         console.log('active');
    //       }
    //       else{
    //      localStorage.clear();
    //  this.nav.push('FirstPage',{logout:'logout'});
    //       }
    //       console.log('recipedata'+JSON.stringify(data));
    //         if (localStorage['user_id']!=undefined) {
    //      setTimeout(() => {
    //    this.ngOnInit();
    //   }, 50000);
    //         }
    //     }),
    //     error => {}
    // }
    MyApp.prototype.showAdmobBannerAds = function () {
        /*   const bannerConfig: AdMobFreeBannerConfig = {
              id:"ca-app-pub-9136331443790194/7121103168",
              isTesting: true,
              autoShow: true
          };
          this.admobFree.banner.config(bannerConfig);
      
          this.admobFree.banner.prepare()
          .then(() => {
              //this.admobFree.banner.show();
              // banner Ad is ready
              // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(JSON.stringify(e))); */
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [FCM, SecurityProvider, AlertController, Platform, StatusBar, SplashScreen, TranslateService, AdMob])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map