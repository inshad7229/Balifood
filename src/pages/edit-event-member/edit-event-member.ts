import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { SecurityProvider } from "../../providers/security/security";
import { AlertController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-event-member",
  templateUrl: "edit-event-member.html"
})
export class EditEventMemberPage {
  data;
  extradata;
  eventMembers;
  a;
  allUser2;
  allUser;
  member_id = [];
  new_members = [];
  eventData;
  event_id;
  member = [];
  constructor(
    public alertCtrl: AlertController,
    public securityProvider: SecurityProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private translateService: TranslateService,
  ) {
    this.eventData = this.navParams.get("eventData");
    console.log("members" + JSON.stringify(this.eventData));
    this.member_id = this.eventData.members;
    this.event_id = this.eventData._id;
    this.extradata = this.eventData.members;
    this.eventMembers = this.eventData.members;
  }

  ionViewDidLoad() {
    //alert(JSON.stringify( this.extradata));
    console.log("ionViewDidLoad CreateeventmemberPage");
    console.log("ionViewDidLoad ImportcontactsPage");
    var a = localStorage["user_id"];
    this.securityProvider.AllUserFriend(a).subscribe(data => {
      var a = data;
      this.allUser = this.getOrderData(a.allUsers);
      this.allUser2 = this.getOrderData(a.allUsers);

      for (var i = 0; i < this.allUser.length; i++) {
        if (
          this.extradata.some(element =>
            element.member_id.includes(this.allUser[i]._id)
          )
        ) {
          this.allUser[i].checkStatus = true;
        }
      }
      // this.onCheck();
    }),
      error => {};
  }

  /*   checkExisting(value){

	  return this.extradata.some(element => element.member_id.includes(value));
		  
	  
  } */

  checkExisting(index, value) {
    // alert(index);
    if (this.extradata.some(element => element.member_id.includes(value))) {
      this.allUser[index].checkStatus = !this.allUser[index].checkStatus;
    }
  }
  getOrderData(data) {
    var a = data.sort(function(x, z) {
      return x.username < z.username ? -1 : 1;
    });
    return a;
  }

  getItems(ev: any) {
    var val = ev.target.value;

    if (val && val.trim() != "") {
      this.allUser = this.allUser.filter(p => {
        if (p.username) {
          return p.username.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }
      });
    } else {
      this.allUser = this.allUser2;
    }
  }
  onCheckmember(index, a) {
    this.allUser[index].checkStatus = !this.allUser[index].checkStatus;
    this.onCheck();
  }

  onremovemember(user) {
    user.checkStatus = false;
    let index = this.findWithAttr(this.allUser, "_id", user.member_id);
    if (index == -1) {
      index = this.findWithAttr(this.allUser, "member_id", user.member_id);
    }
    //alert(index);
    this.allUser[index].checkStatus = false;
    //alert(JSON.stringify(this.allUser[index]));
    this.onCheck();
    this.onRemove(user);
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
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

  onRemove(user) {
    //alert(JSON.stringify(this.allUser));
    if (this.extradata) {
      let data = this.extradata.filter(arg => arg._id != user._id);
      if (data.length > 0) {
        //alert('here');
        this.eventMembers = data;
        //alert(this.extradata);

        console.log("da" + JSON.stringify(data));
      } else {
        this.extradata = [];
      }
    }
  }

  onAddMembers() {
    console.log("member" + JSON.stringify(this.extradata));
    for (let a of this.extradata) {
      var b = a._id;
      var p;
	  var k;
      if (a.profileImage) {
        p = a.profileImage;
      } else {
       p = null;
      }

      let index = this.findWithAttr(this.eventMembers, "email", a.email);
	  	 // alert(index);
      let e = a.email;
      let u = a.username;
      if (index != -1) {
        if (this.eventMembers[index].status) {
          if (this.eventMembers[index].status == "active") {
             k = "pending";
          } else {
             k = this.eventMembers[index].status;
          }
        } else {
            k = "pending";
        }
      } else {
          k = "pending";
      }
      this.new_members.push({
        member_id: b,
        profileImage: p,
        email: e,
        username: u,
        status: k
      });
    }
    var a = {
      event_id: this.event_id,
      members: this.new_members
    };
    console.log(JSON.stringify("member_data" + a));
    this.securityProvider.addMembers(a).subscribe(data => {
      var a = data;
      this.navCtrl.pop();
    }),
      error => {};
  }
}
