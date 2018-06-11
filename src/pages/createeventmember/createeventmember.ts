

import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  Observable
} from 'rxjs/Rx';
import {
  SecurityProvider
} from '../../providers/security/security';
import {
  AlertController
} from 'ionic-angular';

import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-createeventmember',
  templateUrl: 'createeventmember.html',
})

export class CreateeventmemberPage {
  data;
  extradata
  a
  allUser2
  allUser
  member_id = []
  event_id
  constructor(private translate: TranslateService,public alertCtrl: AlertController, public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.event_id = this.navParams.get('event_id');
    this.data = [{
        id: 1,
        name: 'rohit smith',
        color: 'color-red',
        img: 'assets/imgs/profile_img.png'
      },
      {
        id: 2,
        name: 'john smith',
        color: 'color-green',
        img: 'assets/imgs/balifood.jpg'
      },
      {
        id: 3,
        name: 'ravi jain',
        color: 'color-red',
        img: 'assets/imgs/Bebek-and-Ayam-Betutu.jpg'
      },
      {
        id: 4,
        name: 'mohit',
        color: 'color-green',
        img: 'assets/imgs/profile_img.png'
      },
      {
        id: 5,
        name: 'sahil thukral',
        color: 'color-red',
        img: 'assets/imgs/korean.jpg'
      },
      {
        id: 6,
        name: 'john smith',
        color: 'color-green',
        img: 'assets/imgs/profile_img.png'
      },
      {
        id: 7,
        name: 'ashish garg',
        color: 'color-red',
        img: 'assets/imgs/profiler.png'
      },
      {
        id: 8,
        name: 'rahul sohal',
        color: 'color-green',
        img: 'assets/imgs/profile_img.png'
      }
    ];
    this.a = this.data
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateeventmemberPage');
    console.log('ionViewDidLoad ImportcontactsPage');
    var a = localStorage['user_id'];
    this.securityProvider.AllUserFriend(a)
      .subscribe(data => {
        var a = data;
        this.allUser = this.getOrderData(a.allUsers);
        this.allUser2 = this.getOrderData(a.allUsers);
        this.onCheck();
      }),
      error => {}
  }
    getOrderData(data){
    var a=data.sort(function(x,z){return (x.username.toLowerCase() < z.username.toLowerCase() ? -1 : 1) });
    return a;
}
  getItems(ev: any) {
    var val = ev.target.value;

    if (val && val.trim() != '') {

      this.allUser = this.allUser.filter((p) => {
        if (p.username) {
          return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    } else {
      this.allUser = this.allUser2;
    }
  }
  onCheckmember(index, a) {
    this.allUser[index].checkStatus = !this.allUser[index].checkStatus;
    this.onCheck();
  }
  onremovemember(index) {
    this.allUser[index].checkStatus = !this.allUser[index].checkStatus;
    this.onCheck();
  }
  onCheck() {
    if (this.allUser) {
      let data = this.allUser.filter(arg => arg.checkStatus == true);
      if (data.length > 0) {
        this.extradata = data;

        console.log("da" + JSON.stringify(data));

      } else {
        this.extradata = [];
      }
    }
  }
    onAddMembers() {
        console.log('member' + JSON.stringify(this.extradata));
        for (let a of this.extradata) {
            var b = a._id;

            if (a.profileImage) {
            var p= a.profileImage;
            }
            else{
            var p=null
            }
            var e=a.email;
            var u=a.username;
            this.member_id.push({member_id:b,profileImage:p,email:e,username:u});

        }
        var a = {
            event_id: this.event_id,
            members: this.member_id
        }
        console.log(JSON.stringify("member_data"+a));
        this.securityProvider.addMembers(a)
            .subscribe(data => {
                var a = data;
                if (a.success == true) {
                let alert = this.alertCtrl.create({
                  subTitle: this.member_id.length + this.translate.instant('popup.members_add_to_event'),
                  buttons: [this.translate.instant('popup.ok')]
                });
                alert.present();
                this.navCtrl.pop();
            }
        }),
        error => {}
    }

}

