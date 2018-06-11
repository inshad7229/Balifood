import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,
ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';

@IonicPage()
@Component({
  selector: 'page-create-menu-owner',
  templateUrl: 'create-menu-owner.html',
})


export class CreateMenuOwnerPage {
  allUser
  checkStatus
  userName
  user_id
  allUser2
  Events
  eventMember
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMenuOwnerPage');
    var a = localStorage['user_id'];
    this.securityProvider.AllUserFriend(a)
      .subscribe(data => {
		  //alert(JSON.stringify(data));
        var a = data;
        this.allUser = a.allUsers;
        this.allUser2 = a.allUsers;
      }),
      error => {}
  }
 ngOnInit(){
  var a=localStorage['user_id'];
   this.securityProvider.MyEvent(a)
      .subscribe(data => {
        var a=data;
        this.Events=a.userEvents;
        console.log("data"+JSON.stringify(data));
        this.matchEvent();
      }),
      error => {
        console.log("err"+JSON.stringify(error));
      }
}
	matchEvent(){
	  var a=localStorage['event_id']
	  let data=this.Events.filter(arg=>arg._id==a)
	  if (data.length>0) {
		var a=data[0]
		this.eventMember=this.getOrderData(a.members);
	  }
	  else{
		console.log("no event data"+JSON.stringify(data));
	  }
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
  onCheckmember(index, data) {
    this.checkStatus = index;
    this.userName = data.username;
    this.user_id = data.member_id;
    console.log("check_data" + JSON.stringify(data));
  }
  onDone() {
    var a = {
      userName: this.userName,
      user_id: this.user_id
    }
    this.viewCtrl.dismiss(a);
  }
  onClose() {
    this.viewCtrl.dismiss();
  }


}

