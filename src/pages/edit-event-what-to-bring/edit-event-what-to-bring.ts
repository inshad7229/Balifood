import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,LoadingController,AlertController
} from 'ionic-angular';
import {
  ModalController
} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventWhatToBringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event-what-to-bring',
  templateUrl: 'edit-event-what-to-bring.html',
})
export class EditEventWhatToBringPage {
  userEvents
  Menu_event = []
  Menu
  event_id
  menu_id
  eventType
  eventUserId
  eventData
  localData
  editItems:boolean
  constructor(public translateService:TranslateService,public securityProvider: SecurityProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController,public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.Menu = {};
     this.eventData=this.navParams.get('eventData');
    var a=localStorage['user_id'];
   this.securityProvider.MyEvent(a)
      .subscribe(data => {
        var a=data;
        if (a.success==true) {
          this.eventData =this.findObjectByKey(a.userEvents,'_id',this.eventData._id);
       //   alert(JSON.stringify(this.eventData));
          if (this.eventData) {
      this.event_id=this.eventData._id;
     this.eventType=this.eventData.eventType;
     this.Menu_event=this.eventData.whatToBring;
     this.eventUserId=this.eventData.userId;
    }
        }
        console.log("data"+JSON.stringify(data));
      }),
           
      error => {
        console.log("err"+JSON.stringify(error));
      }
   //=this.navParams.get('eventData');
    
    if (this.eventUserId==localStorage['user_id']) {
    this.editItems=true
    }
    else{
      this.editItems=false
    }
    //alert(JSON.stringify(this.eventData));
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEventWhatToBringPage');
  }

  findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

onDeleteOwner(Menu){
	Menu.whatToBringId=Menu._id
	delete Menu['_id']
	Menu.memberId=localStorage['user_id'],
	Menu.memberName=localStorage['username']
	Menu.eventId=localStorage['event_id']
	 let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.EditbringItem(Menu))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Item_updated_successfully'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
           
          } else {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Something_went_wrong'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );
	  


}

    presentConfirm(menuId, Menu) {
      let alert = this.alertCtrl.create({
        title: this.translateService.instant('popup.Confirm_delete'),
        message:  this.translateService.instant('popup.confirmationMessage'),
        buttons: [
          {
            text: this.translateService.instant('popup.no'),
            role: this.translateService.instant('popup.Cancel'),
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.translateService.instant('popup.yes'),
            handler: () => {
              console.log('Delete clicked');
    		  this.onDeleteitem(menuId);
    		    Menu.deleted=true;
            }
          }
        ]
      });
      alert.present();

}
onAdd() {
    let Modal = this.modalCtrl.create('EditEventWhatToBringFormPage', {
      event_id: this.event_id,
      eventData:this.eventData,
      eventType: this.eventType,
    });
    Modal.onDidDismiss(data => {
      if (data) {
        this.Menu_event = data.whatToBring;
      }
    });
    Modal.present();
  }
  onDeleteitem(BringId){
 var a = {
   eventId:this.event_id,
   whatToBringId:BringId
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.onDeleteitem(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a=data;
               if (a.success==true) {
           
            let alert = this.alertCtrl.create({
                subTitle: this.translateService.instant('popup.Item_Removed'),
                buttons: [this.translateService.instant('popup.ok')]
              });
              alert.present();
              //this.navCtrl.push('EventsPage');
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  onEditItems(item){
    let Modal = this.modalCtrl.create('EditEventWhatToBringFormPage', {
       eventData:this.eventData,
       editbringItems:item
    });
    Modal.onDidDismiss(data => {
      if (data) {
        console.log("event_menu" + JSON.stringify(data));
        this.Menu_event = data.whatToBring;
      }
    });
    Modal.present();
  }
    onEvent(){
    this.navCtrl.push('EventsPage');
  }
}
