import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})


export class AccountPage {
  listclass
  list;
  dataa
  user_img;
  username
  Category
  user_image
  user_imagee
  alluserdata
  user_id;
  mypost;
  contacts
  contactListArray = []
  value = 0
  activefreind
  activePost
  offsetData=0
  
  activeinvite
  constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController, public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    this.listclass = 'list-view';
    this.list = 'true';

    this.activefreind = ''
    this.activePost = ''
    this.activeinvite = ''

    this.user_id = localStorage['user_id'];
	  this.translate.use(localStorage['language']);

  }



  ionViewDidLoad() {
    if (localStorage['contact_data']) {
      this.contacts = JSON.parse(localStorage['contact_data']);
      this.value = this.value;
      this.forContact();
      this.value++;
    }
    //console.log('ionViewDidLoad AccountPage');
    setTimeout(() => {
      this.ionViewDidLoad();

    }, 1000);
  }

  forContact() {
    if (this.contacts) {
      if (this.value == 1) {
        for (let a of this.contacts) {
          for (let b of a._objectInstance.phoneNumbers) {
            var d = b.value;
            var e = d.replace(" ", "");
            this.contactListArray.push(e);
          }
        }
      }
    }
  }
  ngOnInit() {
    this.alluser();

    this.allRecipe();
    this.username = this.username
    this.user_image = this.user_image
    console.log('img' + this.user_image);
    var a = localStorage['user_id']
    this.securityProvider.MyRecipe(a)
      .subscribe(data => {
//        console.log("cat_data" + JSON.stringify(data));
        this.Category = data.recipes;
      }),
      setTimeout(() => {
        this.ngOnInit();
      }, 10000);

    error => {}

  }
  alluser() {
    var a = localStorage['user_id']
    this.securityProvider.AllUserFriend(a)
      .subscribe(data => {
        var c = data;
        this.alluserdata = c.allUsers;
        this.userimg();
        let filterdata = this.alluserdata.filter(arg => arg._id == a)
        console.log("data" + JSON.stringify(filterdata))
        if (filterdata.length > 0) {
          this.user_image = filterdata[0].profileImage;
          this.username = filterdata[0].username;
        }
      })
  }

  userimg() {
    var a = localStorage['user_id']
    if (this.alluserdata) {
      // code...
      let filterdata = this.alluserdata.filter(arg => arg._id == a)
     // console.log("datafilter" + JSON.stringify(filterdata))
      if (filterdata.length > 0) {
        if (filterdata[0].profileImage) {
          return filterdata[0].profileImage;;
        } else {
          return 'assets/imgs/profiler.png';
        }
      } else {
        return 'assets/imgs/profiler.png';
      }
    }

  }
  onIconlist() {
    this.listclass = 'grid-view';
    this.list = 'false'
  }
  onIcongrid() {
    this.listclass = 'list-view';
    this.list = 'true'
  }
  onSetting() {
    this.navCtrl.push('SettingsPage');
  }
  onEditProfile() {
    let modal = this.modalCtrl.create('EditProfilePage', {
      user_image: this.user_image,
      username: this.username
    });
    modal.onDidDismiss(data => {
      if (data) {
        console.log("data" + JSON.stringify(data));
        var a = data;
        delete localStorage['user_image'];
        delete localStorage['username'];
        localStorage['user_image'] = a.user_image;
        localStorage['username'] = a.username;
        console.log("this.user_image" + this.user_image);
        this.ngOnInit();
      }
    });
    modal.present();
  }
  onfriendlink() {
    this.activefreind = 'activefreind';
    this.activePost = '';
    this.activeinvite = '';
    this.navCtrl.push('AccountFriendsPage');
  }

  contactImported(contactListArray) {
    var a = {
      user_id: localStorage['user_id'],
      contacts: contactListArray
    }
    this.securityProvider.ContactImport(a)
      .subscribe(data => {
        var a = data;
      }),
      (err) => {
        alert("err" + err);
      }
  }

  onMyPost() {
    this.activefreind = '';
    this.activePost = 'activePost'
    this.activeinvite = '';
    this.navCtrl.push('AccountMyPostPage');
  }
  onInviteFriend() {
    this.activefreind = '';
    this.activePost = ''
    this.activeinvite = 'activeinvite';
    this.navCtrl.push('AccountInviteFriendsPage');
  }

  allRecipe() {
	  
    this.securityProvider.MainRecipe(this.offsetData)
      .subscribe(data => {
        this.dataa = data.Recipes;
        this.getStatusFOrdisabled();
      }),
      error => {}
  }
  getStatusFOrdisabled() {
	  if(this.dataa) {
    let data = this.dataa.filter(arg => this.user_id == arg.user_id && arg.categories != "Others");
    if (data.length > 0) {
      this.mypost = data;
    } else {
      console.log("data1" + JSON.stringify(data));
    }
	  }
  }

  onViewDetail(recipe_id, recipe_data) {
    this.navCtrl.push('ViewRecipesPage', {
      recipe_data: recipe_data
    });
    console.log("recipe_data" + JSON.stringify(recipe_data));
    var a = {
      recipe_id: recipe_id,
      user_id: localStorage['user_id']
    }

    this.securityProvider.View_detail(a)
      .subscribe(data => {
        console.log('View_data' + JSON.stringify(data));
        this.ngOnInit();

      }),
      error => {}
  }
}

