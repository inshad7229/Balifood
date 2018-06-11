import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
Notification
eventData
friendRequestsNotification
mergeNotify=[]
  constructor(public translateService:TranslateService,public securityProvider: SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

   ngOnInit() {
     this.mergeNotify=[]
    this.GetNotification();
    this.friendNotification();
      setTimeout(() => {
     this.ngOnInit();
    }, 50000);
       
  	
   }

   GetNotification(){
        var a=localStorage['user_id'];
      this.securityProvider.GetNotification(a)
      .subscribe(data => {
        var a=data;
        this.Notification=a.notifications.reverse();
        // for(let a of Notification){
        //  this.mergeNotify.push(a);
         
        // }
       
      }),
      error => {}
   }

   friendNotification(){
     var a=localStorage['user_id'];
      this.securityProvider.GetFreindNotification(a)
      .subscribe(data => {
        var a=data;
        this.friendRequestsNotification=a.friendRequests;
      }),
      error => {}
   }

   getOrderData(array){
 array.sort(function(a,b){return b.createdDate - a.createdDate})
 return array
}

   onAcceptRequest(requester,status){
   	////status=1/accept, status=2/reject/////////
   	var a={
requester:requester,
recipient:localStorage['user_id'],
status:status
   	}
   	 this.securityProvider.acceptOrRejectFriendRequest(a)
      .subscribe(data => {
      	var a=data;
console.log("a"+JSON.stringify(a));
this.ngOnInit();
      }),

      error => {
        console.log("err"+JSON.stringify(error));
      }
   }

   onAcceptRequestInvitation(eventId,notification_id,status){
     if (status==1) {
       var s='Confirmed';
     }
     else{
   var s='Cancelled';
     }
     var a={
eventId:eventId,
member_id:localStorage['user_id'],
status:s,
notificationId:notification_id
     }
      this.securityProvider.acceptOrRejectRequest(a)
      .subscribe(data => {
        var a=data;
console.log("a"+JSON.stringify(a));
this.ngOnInit();
      }),

      error => {
        console.log("err"+JSON.stringify(error));
      }
   }

   onAcceptRequestInvitationForBringItems(eventId,notification_id,status,whatToBringId){
      if (status==1) {
       var s='Confirmed';
     }
     else{
   var s='Cancelled';
     }
     var a={
eventId:eventId,
whatToBringId:whatToBringId,
status:s,
notificationId:notification_id,
member_id:localStorage['user_id'],
username:localStorage['username']
     }
      this.securityProvider.onAcceptRequestInvitationForBringItems(a)
      .subscribe(data => {
        var a=data;
console.log("a"+JSON.stringify(a));
this.ngOnInit();
      }),

      error => {
        console.log("err"+JSON.stringify(error));
      }
   }

   allimg(img){
     if(img){
       return img;
     }
     else{
       return 'assets/imgs/profile_img.png';
     }
   }
   funDate(date){
    if (date) {
       var a=date.split(" ");
     return a[1]+" "+ a[2]+" "+a[3];
    }
   }
change(data){
let a=data.filter(arg=>arg==localStorage['user_id'])
if (a.length>0) {
  return true;
}
else{
  return false;
}
}

goToEvent(eventid){
	let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.thisEvent(eventid))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a=data;
		  localStorage['event_id']=eventid;
          if (a.success==true) {
          this.eventData=a.eventData;
		  this.navCtrl.push('MyEventsPage',{eventData:a.eventData, lastPage:'notifications'});
          }
         
        }),
        error =>
        loading.dismiss().then(() => {})
      );
	
}

millisecondsToStr (milliseconds) {
  
   milliseconds =  new Date(milliseconds).getTime();
  var mstoday = new Date().getTime();
  milliseconds=mstoday-milliseconds;

    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years)+" ago";
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days)+" ago";
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours)+" ago";
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes)+" ago";
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds)+" ago";
    }
    return 'less than a second ago'; //'just now' //or other string you like;
}


}
