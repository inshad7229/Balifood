import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { SecurityProvider } from '../providers/security/security';
import { FCM } from '@ionic-native/fcm';
import { AdMob } from '@ionic-native/admob';


interface AdMobType {
  banner: string,
  interstitial: string
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = 'FirstPage';
   @ViewChild(Nav) nav: Nav;

  rootPage;
  constructor(private fcm: FCM,public securityProvider:SecurityProvider, public alertCtrl:AlertController,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private translate: TranslateService, private admob: AdMob ) {
     
    //translate.setDefaultLang('en');
	  

    if(localStorage['authh']==1){
      this.rootPage = TabsPage; 
    }
    else{
       this.rootPage = 'FirstPage';
    }
   
    platform.ready().then(() => {
		//this.showAdmobBannerAds();
		var admobid: AdMobType;
		  
      if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
          banner: 'ca-app-pub-9136331443790194/7121103168',
          interstitial: 'ca-app-pub-9136331443790194/3138869390'
        };
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
		   banner: 'ca-app-pub-9136331443790194/7121103168',
          interstitial: 'ca-app-pub-9136331443790194/3138869390'
        };
      } else {
        admobid = { // for Windows Phone
           banner: 'ca-app-pub-9136331443790194/7121103168',
          interstitial: 'ca-app-pub-9136331443790194/3138869390'
        };
      }
 
      this.admob.createBanner({
        adId: admobid.banner,
        isTesting: true,//comment this out before publishing the app
		position: this.admob.AD_POSITION.BOTTOM_CENTER,
		overlap:false,
		autoShow: true
      });
		translate.setDefaultLang('en');
         //  alert(localStorage['language']);
			if(localStorage['language']){
			translate.use(localStorage['language'])
		}
               
	  fcm.onNotification().subscribe(data=>{
        //alert("1"+JSON.stringify(data));
  if(data.wasTapped){
    console.log("Received in background");
    //alert("2"+JSON.stringify(data));
    //this.nav.push('ContactusPage'); 
  } else {
    console.log("Received in foreground");
    //alert("3"+JSON.stringify(data));
     //this.nav.push('AccountPage'); 
  };
})

	

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
  
  showAdmobBannerAds(){
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
    }      

}
