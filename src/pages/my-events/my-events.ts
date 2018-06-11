import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
const heroesUrl = 'http://18.218.43.56:5001/api/'; 


@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {
pet
eventData
eventUserId
visible
EventOwner:boolean;
checkTime
date
time
day
hour
minute
second
pic
EXPIREDEVENTS
post_img:boolean;

  constructor(public translateService:TranslateService,private transfer: FileTransfer, private file: File,public actionSheetCtrl: ActionSheetController, private camera: Camera, public alertCtrl:AlertController, public loadingCtrl:LoadingController,private translate: TranslateService, public securityProvider:SecurityProvider, public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
	  this.translate.use(localStorage['language']);
	  	  platform.registerBackButtonAction(() => {
			this.eventList();
    },2);
 this.pet='Menu';
  this.visible='md-add-circle';
 this.post_img=false;
 this.eventData=this.navParams.get('eventData');
 localStorage["event_id"]=this.eventData._id
 	if(this.navParams.get('lastPage')!='notifications'){
 this.refreshEvent();
	}
//this.getAverageScores();
 for(var k=0; k<this.eventData.menu.length; k++){
	 this.eventData.menu[k].mygrade=this.getMyGrade( this.eventData.menu[k],  this.eventData.menu[k].grade);
 }
 console.log("event_data"+JSON.stringify(this.eventData));
 this.eventUserId=this.eventData.userId;
 if (this.eventUserId==localStorage['user_id']) {
  this.EventOwner=true
 }
 else{
   this.EventOwner=false;
 }
 console.log("eventData"+JSON.stringify(this.eventData));

  }
  fun(date){
var a=date.split('T')
return a[0];
  } 
getAvg(data){
	
var avg = Array.from(data.reduce(
        (acc, obj) => Object.keys(obj).reduce( 
            (acc, key) => typeof obj[key] == "number"
                ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                : acc,
        acc),
    new Map()), 
        ([name, values]) =>
            ({ name, average: values.reduce( (a,b) => a+b ) / values.length })
    );
	if(avg[0]){
	return avg[0].average;
	}else{
		return 'Not Submitted';
	}
	}
	
	eventList(){
		if(this.navParams.get('lastPage')=='notifications'){
		this.navCtrl.setRoot('NotificationPage');	
		}else{
		this.navCtrl.setRoot('EventsPage');	
		}
		
	}
	
	refreshEvent(){
		
	let loading = this.loadingCtrl.create({
      content: this.translate.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.thisEvent(localStorage['event_id']))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a=data;
          if (a.success==true) {
          this.eventData=a.eventData;
          }
         
        }),
        error =>
        loading.dismiss().then(() => {})
      );
	}
  addGrade(value, menu){
	 // alert(value);
	  menu.grades=value;
	  var a={
  eventId:this.eventData._id,
  menuId:menu._id,
  userId:localStorage['user_id'],
  grade:value
}
let loading = this.loadingCtrl.create({
      content: this.translate.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.addGrades(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a=data;
          if (a.success==true) {
             let alert = this.alertCtrl.create({
              subTitle:this.translate.instant('popup.grades_added'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
			menu.grades=value;
           // this.navCtrl.pop();
          }
         
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  camelize(str) {
return str;
  // return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

}

findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

setMyGrades(value, a){
	return a.grades=value;
}
getMyGrade(a, arr){

if(this.findObjectByKey(arr,'userId',localStorage['user_id'])==null){
a.grades=0;
return "0";
}else{
	a.grades=this.findObjectByKey(arr,'userId',localStorage['user_id']).grade;
	 return this.findObjectByKey(arr,'userId',localStorage['user_id']).grade;
}

}
toggle(a){
	
	if(a.visible){
		a.visible=false;
		this.addGrade(a.grades, a);
		//this.setMyGrades(a.grades, a);
		
	}else{
		a.visible=true;
		//this.addGrade(a.grades);
	}
}
  ionViewDidLoad() {
    this.date=this.eventData.date
     var countDownDate = new Date(this.date).getTime();
       var now = new Date().getTime();
    var distance = countDownDate - now;
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.checkTime=days+"-"+hours+"-"+minutes+"-"+seconds+"-";
    var t=this.checkTime.split("-");
      this.day=t[0];
      this.hour=t[1];
      this.minute=t[2];
      this.second=t[3];
    if (distance < 0) {
        this.EXPIREDEVENTS = "EXPIRED";
    }
    //console.log('ionViewDidLoad MyEventsPage');
    setTimeout(() => {
		//alert(this.navCtrl.getActive().name);
     this.ionViewDidLoad();
    }, 1000);
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
        

      }),
      error => {}
  }
 
change(date){
var a=date.split('T')
return a[0];
}
onEditEvents(){
	this.navCtrl.push('EditEventPage',{eventData:this.eventData});
}
onDeleteMember(member_id){
var a={
  eventId:this.eventData._id,
  memberId:member_id
}
let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.onDeleteMemberFromEvent(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a=data;
          if (a.success==true) {
             let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Member_deleted'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            this.navCtrl.pop();
          }
         
        }),
        error =>
        loading.dismiss().then(() => {})
      );
}
  ondeleteEvent() {
  	let confirm = this.alertCtrl.create({
      message: this.translateService.instant('popup.event_conf'),
      buttons: [
        {
          text:this.translateService.instant('popup.no'),
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.confirmEvents();
          }
        }
      ]
    });
    confirm.present();

  }
  confirmEvents(){
      var event_id= this.eventData._id
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.ondeleteEvent(event_id))
      .subscribe(data =>
        loading.dismiss().then(() => {
        	var a=data;
        	if (a.success==true) {
        		 let alert = this.alertCtrl.create({
				      subTitle: this.translateService.instant('popup.event_del'),
				      buttons: [this.translateService.instant('popup.ok')]
				    });
				    alert.present();
				    this.navCtrl.pop();
        	}
         
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }

    public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title:this.translateService.instant('popup.Select_Image'),
      buttons: [{
          text: this.translateService.instant('popup.Load_library'),
          handler: () => {
            this.fromgallery();
          }
        },
        {
          text: this.translateService.instant('popup.use_camera'),
          handler: () => {
            this.fromcamera();
          }
        },
        {
          text:this.translateService.instant('popup.Cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  fromgallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit:true
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = imageData;
      // this.post_img=true
      this.onPostImage(this.pic)
    }, (err) => {
      console.log('gallery not working');
    })
  }


  fromcamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit:true
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = imageData;
       // this.post_img=true
       this.onPostImage(this.pic)
    }, (err) => {
      console.log('camera not working');
    })
  }

  onPostImage(image){
    var a=Math.random();
      let fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'photo',
        fileName: 'image'+a,
        chunkedMode: false,
        headers: {}
      }
      fileTransfer.upload(image, heroesUrl + 'addEventImages/' + this.eventData._id, options)
        .then((data) => {
          var a = data;
         let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.image_post'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
           this.post_img=false;
        }, (err) => {

        })
    }
    onPostImageCancel(){
      this.post_img=false;
    }
    onPhoto(){
      this.navCtrl.push('EventPhotosPage',{event_id:this.eventData._id})
    }
	
	 onChat(){
      this.navCtrl.push('EventChatPage',{event:this.eventData})
    }
  
}
