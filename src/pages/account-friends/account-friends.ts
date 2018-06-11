

import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import {
  Observable
} from 'rxjs/Rx';
import {
  SecurityProvider
} from '../../providers/security/security';
/**
 * Generated class for the AccountFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-friends',
  templateUrl: 'account-friends.html',
})
export class AccountFriendsPage {
  allUser;
  allUser2
  user_contact
  contacts
  e = []
  contactListArray = []
  ContactFriends
  contactData
  contactData2
  constructor(public loadingCtrl: LoadingController, public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {}


  ionViewDidLoad() {
    var a = localStorage['user_id'];
    this.securityProvider.AllUserFriend(a)
      .subscribe(data => {
        var a = data;
        this.allUser = a.allUsers;
        this.allUser2 = a.allUsers;
      }),
      setTimeout(() => {
        this.ionViewDidLoad();
      }, 10000);
    error => {
      console.log("err" + JSON.stringify(error));
    }
  }

 capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  getstatus(id) {
    if (this.allUser) {
      let data = this.allUser.filter(arg => arg._id == id)
      if (data.length > 0) {
        return data.friendStatus;
       //return 1;
      } else {
      	//return 0;
       return data.friendStatus;
      }
    }
  }

  ngOnInit() {
    var a = {
      user_id: localStorage['user_id']
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.FetchContact(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          this.ContactFriends = a.contacts;
          console.log("contactData1"+JSON.stringify(this.ContactFriends));
          let dataa = this.ContactFriends;
          if (dataa.length > 0) {
            this.contactData = dataa;
            console.log("contactData2"+JSON.stringify(this.contactData));
            this.contactData2 = dataa;
          }
        }),
        error =>
        loading.dismiss().then(() => {

        })
      );
  }

  getstatuscheck() {

    if (this.contacts) {
      for (let a of this.contacts) {
        for (let b of a._objectInstance.phoneNumbers) {
          var d = b.value;
          this.e.push(d);
        }

      }

    }
  }
  match(contactNumber) {
    var cont = contactNumber;
    var cont1 = "+91" + contactNumber;
    var cont2 = "91" + contactNumber;
    alert(cont1);
    alert("cont" + this.e.indexOf(cont))
    alert("cont1" + this.e.indexOf(cont1))
    alert("cont2" + this.e.indexOf(cont2))
    for (var i = 0; i < this.e.length; i++) {
      alert("ex" + this.e[i].includes(cont));
    }
    let data = this.e.filter(arg => arg.contactNumber == cont || arg.contactNumber == cont1 || arg.contactNumber == cont2);
    if (data.length > 0) {
      alert('true');
    } else {
      alert('false');
    }
  }


  onChangeFun() {
    this.allUser = this.contacts;
    for (var i = 0; i <= this.allUser.length; i++) {
      var a = [];
      if (this.allUser[i].contactNumber.indexOf()) {
        
      }
    }
  }


  
    getUsers(ev: any) {
    var val = ev.target.value;

    if (val && val.trim() != '') {

      this.allUser = this.allUser.filter((p) => {
        if (p.username) {
          return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    } else {
      this.contactData = this.contactData2;
    }
  }
  
  getItems(ev: any) {
    var val = ev.target.value;

    if (val && val.trim() != '') {

      this.contactData = this.contactData.filter((p) => {
        if (p.username) {
          return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    } else {
      this.contactData = this.contactData2;
    }
  }


  allimg(img) {
    if (img) {
      return img;
    } else {
      return 'assets/imgs/profiler.png';
    }
  }

  onAddToFriend(number, recipient_id) {
    var a = {
      requester: localStorage['user_id'],
      recipient: recipient_id
    }
    this.securityProvider.AddToFriend(a)
      .subscribe(data => {
        var a = data;
        console.log("addFriend" + JSON.stringify(a));
        this.ngOnInit();
      }),

      error => {}
  }


}

