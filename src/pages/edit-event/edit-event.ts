import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera';
import {
  ActionSheetController
} from 'ionic-angular';
import {
  Observable
} from 'rxjs/Rx';
import {
  SecurityProvider
} from '../../providers/security/security';
import {
  ModalController
} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {
  pic
  menuPopUp: boolean
  location
  lat
  lng
  Event
  event_id
  min_date
  datee
  eventData
  enableEdit : boolean
  eventType

   constructor(private translateService: TranslateService,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public securityProvider: SecurityProvider, public actionSheetCtrl: ActionSheetController, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    this.eventData=this.navParams.get('eventData');
	  platform.registerBackButtonAction(() => {
			this.onEvent();
    },2);
    this.menuPopUp = false
    this.Event = {}
    if (this.eventData) {
       this.Event.event_name=this.eventData.event_name;
       if (this.eventData.image) {
        this.pic = this.eventData.image
       }
       else{
         this.pic = 'assets/imgs/add-profiler.png';
       }
       var c=new Date(this.eventData.date).toJSON().slice(0,10).replace(/-/g,'-');
        var a=c.split('-');
       this.Event.date=a[0]+'-'+a[1]+'-'+a[2];
       this.Event.time=this.eventData.time;
       this.Event.address=this.eventData.address;
       this.Event.event_id=this.eventData._id;
       this.Event.location=this.eventData.location.coordinates[0]+","+this.eventData.location.coordinates[1];
       this.eventType=this.eventData.eventType;
	 
    }
   
    this.datee = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    var date=this.datee.split('-');
    this.min_date=date[0]+'-'+date[1]+'-'+date[2];
	this.enableEdit = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEventPage');
  }
  ionViewDidEnter(){
	   this.refreshEvent();
  }
  	refreshEvent(){
	let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.thisEvent(this.eventData._id))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a=data;
		 // alert(JSON.stringify(a));
		  localStorage['event_id']=this.eventData._id;
          if (a.success==true) {
          this.eventData=a.eventData;
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );
	}
  onEvent(){
    	var a=localStorage['event_id'];
       this.securityProvider.thisEvent(a)
          .subscribe(data => {
            var a=data;
            if (a.success==true) {
               this.eventData=a.eventData;
            }
            console.log("data"+JSON.stringify(data));
          }),
          error => {
            console.log("err"+JSON.stringify(error));
          }
    	  this.navCtrl.push('MyEventsPage',{eventData:this.eventData});
  }

  enableEditing(){
	this.enableEdit= false  

  }
    onMenuCreate() {
    this.menuPopUp = true
  }
  onCreateNewMenu() {
      this.navCtrl.push('EditEventMenuPage', {
        eventData: this.eventData,
        eventType:this.eventType
      });
      this.menuPopUp = false 
  }
  onCreateExistingMenu() {
    this.menuPopUp = false;
    this.navCtrl.push('EventsPage',{existing:'existingEvent'});
  }

 public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translateService.instant('popup.Select_Image_Source'),
      buttons: [{
          text: this.translateService.instant('popup.Load_from_Library'),
          handler: () => {
            this.fromgallery();
          }
        },
        {
          text:this.translateService.instant('popup.Use_Camera'),
          handler: () => {
            this.fromcamera();
          }
        },
        {
          text: this.translateService.instant('popup.Cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  fromgallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit: true
    }).then((imageData) => {
      let base64Image = imageData;
      this.Event.image = imageData;
      this.pic = 'data:image/jpeg;base64,' + imageData;
	  this.enableEdit=false;
    }, (err) => {
      console.log('gallery not working');
    })
	
  }


  fromcamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit: true
    }).then((imageData) => {
      let base64Image = imageData;
      this.pic = 'data:image/jpeg;base64,' + imageData;
      this.Event.image = imageData;
	  	this.enableEdit=false;
    }, (err) => {
      console.log('camera not working');
    })

  }

  onSave() {
    if (this.Event) {
      let loading = this.loadingCtrl.create({
        content: this.translateService.instant('popup.Please_wait')
      });
      Observable.fromPromise(loading.present())
        .flatMap(data => this.securityProvider.UpdateEvent(this.Event))
        .subscribe(data =>
          loading.dismiss().then(() => {
            var a = data;
            if (a.success==true) {
            let alert = this.alertCtrl.create({
            subTitle: this.translateService.instant('popup.no_event'),
            buttons: [this.translateService.instant('popup.ok')]
          });
            alert.present();
		          this.navCtrl.setRoot('EventsPage');
            }
          }),
          error =>
          loading.dismiss().then(() => {})
        );
    }
  }

  change(date){
    var a=date.split('T')
    return a[0];
  }

  onAddMember() {
    this.navCtrl.push('EditEventMemberPage', {
      eventData: this.eventData
    });
  }

  onBringItem() {
    this.event_id = this.Event.event_id;
    this.navCtrl.push('EditEventWhatToBringPage', {
        event_id: this.event_id,
        eventType: 'mutualEvent',
        eventData:this.eventData
      }); 
  }
}
