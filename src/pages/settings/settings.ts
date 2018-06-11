import { Component } from "@angular/core";
import { FCM } from "@ionic-native/fcm";
import {
  IonicPage,
  NavController,
  NavParams,
  Config,
  AlertController,
  ActionSheetController,
  Platform,
  LoadingController
} from "ionic-angular";
import { SocialSharing } from "@ionic-native/social-sharing";
import { ToastController } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { TranslateService } from "@ngx-translate/core";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

import {
  Contacts,
  Contact,
  ContactField,
  ContactName
} from "@ionic-native/contacts";
import { Observable } from "rxjs/Rx";
import { SecurityProvider } from "../../providers/security/security";

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  local;
  nav;
  allContacts;
  lang: boolean;
  contactvalue: boolean;
  contactListArray = [];
  contactNames = [];
  pepperoni
  toggleFlag=0
  constructor(
    public translateService:TranslateService,
    public loadingCtrl: LoadingController,
    public securityProvider: SecurityProvider,
    private contacts: Contacts,
    private fb: Facebook,
    public platform: Platform,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public config: Config,
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing,
	public fcm : FCM
  ) {
    this.lang = true;
    this.contactvalue = false;
    this.translate.use(localStorage["language"]);
	this.pepperoni=false;
	//alert(localStorage['private']);
	if(localStorage['private']==1){
		this.pepperoni=true;
	}
	   this.toggleFlag=1;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }

  onContact() {
    this.navCtrl.push("ContactusPage");
  }
  onFaq() {
    this.navCtrl.push("FaqPage");
  }
  onAbout() {
    this.navCtrl.push("AboutusPage");
  }

  onLogout() {
    let confirm = this.alertCtrl.create({
      message:  this.translateService.instant('popup.logout_con'),
      buttons: [
        {
          text: this.translateService.instant('popup.no'),
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text:this.translateService.instant('popup.yes'),
          handler: () => {
            console.log("Agree clicked");
            this.onconfirm();
          }
        }
      ]
    });
    confirm.present();
  }
  onconfirm() {
    localStorage.clear();
    this.config.set("pageTransition", "ios-transition");
    this.config.set("tabsHideOnSubPages", false);
    this.navCtrl.push("FirstPage", { logout: "logout" });
    this.navCtrl.parent.select(0);
    this.fb
      .logout()
      .then(res => {})
      .catch(e => {});
  }
  onTerm() {
    this.navCtrl.push("TermsConditionsPage");
  }
  onAboutUs() {
    this.navCtrl.push("AboutusPage");
  }

  
   titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

  onTogglePrivacy(flag){
	
	  var settingMessage;
	   this.translate.get('settingtext').subscribe(res=>{settingMessage=res});
	  if(flag==true){
		  let alert = this.alertCtrl.create({
    title:this.translateService.instant('popup.account_private'),
    message:settingMessage,
    buttons: [
      {
        text: this.translateService.instant('popup.Disagree'),
        role: 'cancel',
        handler: () => {
          this.pepperoni=false;
		  localStorage['private']=0;
        }
      },
      {
        text: this.translateService.instant('popup.Agree'),
        handler: () => {
          let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.togglePrivacy(localStorage['user_id']))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true || a.success == 'true') {
            let alert = this.alertCtrl.create({
              subTitle:this.titleCase( a.message),
              buttons: ['OK']
            });
            alert.present();
			if(a.message=='your account is private now'){
				localStorage['private']=1;
				this.pepperoni=true;
				this.toggleFlag=0;
			}else{
				this.pepperoni=false;
			}
         
          }

        }),
        error =>
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            title: this.translateService.instant('popup.title'),
            subTitle:this.translateService.instant('popup.Something_went_wrong'),
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        })
      );
        }
      }
    ]
  });
  alert.present();
		  
	  }else{

	let alert = this.alertCtrl.create({
    title:this.translateService.instant('popup.public'),
    message:this.translateService.instant('popup.available_publically'),
    buttons: [
      {
        text: this.translateService.instant('popup.Disagree'),
        role: 'cancel',
        handler: () => {
           this.pepperoni=false;
		  localStorage['private']=0;
        }
      },
      {
        text:this.translateService.instant('popup.Agree'),
        handler: () => {
          let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.togglePrivacy(localStorage['user_id']))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true || a.success == 'true') {
            let alert = this.alertCtrl.create({
              subTitle:this.titleCase( a.message),
              buttons: ['OK']
            });
            alert.present();
			if(a.message=='your account is public now'){
				localStorage['private']=0;
				this.pepperoni=false;
			}else{
				this.pepperoni=true;
			}
         
          }

        }),
        error =>
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
           title: this.translateService.instant('popup.title'),
            subTitle:this.translateService.instant('popup.Something_went_wrong'),
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        })
      );
        }
      }
    ]
  });
  alert.present();
	  
	  }
  }
  onLanguageChange(language) {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translateService.instant('popup.Choose_Language'),
      cssClass: "action-sheets-groups-page",
      buttons: [
        {
          text: "English",
          role: "destructive",
          icon: "md-globe",
          handler: () => {
            this.translate.use("en");
            localStorage["language"] = "en";
          }
        },
        {
          text: "עברית",
          icon: "md-globe",
          handler: () => {
            this.translate.use("heb");
            localStorage["language"] = "heb";
            console.log("Facebook clicked");
          }
        },
        {
          text: this.translateService.instant('popup.cancel'),
          role: "cancel",
          icon: "close",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }
  share() {
    var message = "Shared by baliFood App";
    var subject = "Balifood";
    var file =
      "http://titan.promaticstechnologies.com/Y1MM/img/shiftimage/2452shiftimag1.jpg";
    var url =
      "https://www.dropbox.com/s/796mk502mbpee64/android-debug.apk?dl=0";
    this.socialSharing
      .share(message, subject, file, url)
      .then(data => {})
      .catch(error => {});
  }
  onShareWith() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translateService.instant('popup.sahre_with'),
      cssClass: "action-sheets-groups-page",
      buttons: [
        {
          text:this.translateService.instant('popup.sahre_with'),
          role: "destructive",
          icon: "logo-instagram",
          handler: () => {
            this.onInsta();
            console.log("Instagram clicked");
          }
        },
        {
          text:this.translateService.instant('popup.sahre_with'),
          icon: "logo-facebook",
          handler: () => {
            this.onFb();
            console.log("Facebook clicked");
          }
        },
        {
          text: this.translateService.instant('popup.cancel'),
          role: "cancel",
          icon: "close",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }
  onFb() {
    let toast = this.toastCtrl.create({
      message:
        "Message has been copied to clipboard you can paste on Facebook!",
      duration: 2000,
      position: "bottom"
    });
    toast.present(toast);
    var message = "Shared by baliFood App";
    var subject = "Balifood";
    var image =
      "http://titan.promaticstechnologies.com/Y1MM/img/shiftimage/2452shiftimag1.jpg";
    var url = "www.balifoodapplink.com";
    this.socialSharing
      .shareViaFacebook(
        message,
        null,
        "https://www.dropbox.com/s/796mk502mbpee64/android-debug.apk?dl=0"
      )
      .then(() => {})
      .catch(() => {});
  }

  onInsta() {
    let toast = this.toastCtrl.create({
      message:
        "Message has been copied to clipboard you can paste on instagram!",
      duration: 2000,
      position: "bottom"
    });
    toast.present(toast);
    var message = "Shared by baliFood App";
    var subject = "Balifood";
    var image =
      "http://titan.promaticstechnologies.com/Y1MM/img/shiftimage/2452shiftimag1.jpg";
    var url = "www.balifoodapplink.com";
    this.socialSharing
      .shareViaInstagram(message + " " + url, image)
      .then(() => {})
      .catch(() => {});
  }

  onContactimport() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.onUpdateContacts();
    this.contacts.find(["displayName", "name", "phoneNumbers"]).then(data => {
      var a = data;
      this.allContacts = data;
      //alert(JSON.stringify(this.allContacts));
      if (data) {
        //  alert(JSON.stringify(data));
        console.log("contact imported");
        localStorage["contact_data"] = data;
        //alert(JSON.stringify(this.allContacts));
        let toast = this.toastCtrl.create({
          message: "Contact Imported successfully!",
          duration: 2000,
          position: "bottom"
        });
        toast.present(toast);
        for (let a of this.allContacts) {
          if (a._objectInstance.phoneNumbers != null) {
            for (let b of a._objectInstance.phoneNumbers) {
              var d = b.value;
              // alert(d);
              // var e=d.replace(/\s/g, "");
              // var f=e.substring(e.length - 10, e.length)
              var f = d.replace(/\D/g, "");

              this.contactListArray.push({ number: f, name: a.displayName });

              //alert(this.contactListArray[0]);
              this.contactNames.push({ number: f, name: a.displayName });

              this.contactvalue = true;
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

        localStorage["contact_array"] = JSON.stringify(this.contactListArray);
        localStorage["contactNames"] = JSON.stringify(this.contactNames);
      }
    });
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  onUpdateContacts() {
    if (this.contactvalue) {
      var unique = Array.from(
        this.removeDuplicates(this.contactListArray, "number")
      );
      var a = {
        user_id: localStorage["user_id"],
        contacts: unique
      };
      this.securityProvider.ContactImport(a).subscribe(data => {
        //alert("data"+JSON.stringify(data));
      }),
        err => {
          alert("err" + err);
        };
    } else {
      setTimeout(() => {
        this.onUpdateContacts();
      }, 1000);
    }
  }
  onNotification() {
    let check1=false
	let check2=false
	if(localStorage['notifications']==1){
		check1=true
	}else{
		check2=true
	}
	if(!localStorage["notifications"]){
		check1=true
		check2=false
	}
	 let prompt = this.alertCtrl.create({
    title: this.translateService.instant('popup.noti_setting'),
    inputs : [
    {
        type:'radio',
        label:this.translateService.instant('popup.enb_noti'),
        value:'1',
		checked: check1
    },
    {
        type:'radio',
        label:this.translateService.instant('popup.dis_noti'),
        value:'0',
		checked: check2
    }],
    buttons : [
    {
        text: this.translateService.instant('popup.cancel'),
        handler: data => {
        console.log("cancel clicked");
        }
    },
    {
        text: this.translateService.instant('popup.sahre_with'),
        handler: data => {
        if(data==1){
			localStorage["notifications"]=1
			this.fcm.subscribeToTopic("Balifood");
		}else{
			localStorage["notifications"]=0
			this.fcm.unsubscribeFromTopic("Balifood");
		}
        }
    }]});
    prompt.present();
	
  }

  onApplication() {}
  onChangePassword() {
    this.navCtrl.push("ChangePasswordPage");
  }
}
