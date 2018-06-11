import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
/**
 * Generated class for the EventPhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-photos',
  templateUrl: 'event-photos.html',
})
export class EventPhotosPage {
event_id
eventPhotos
  constructor(public securityProvider: SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
 this.event_id=this.navParams.get('event_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPhotosPage');
  }
ngOnInit(){
  var a=localStorage['user_id'];
   this.securityProvider.MyEvent(a)
      .subscribe(data => {
        var a=data;
        let evn=a.userEvents.filter(arg=>this.change(arg._id)==this.event_id);

        if (evn.length>0) {
        this.eventPhotos=evn;
        // alert(JSON.stringify(evn));
        }
       
 
        console.log("data"+JSON.stringify(data));
      }),
      error => {
        console.log("err"+JSON.stringify(error));
      }
}

change(id){
	if (id) {
	return id;
	}

}
}
