

import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from 'ionic-angular';
import {
  ModalController,
  ViewController
} from 'ionic-angular';
import {
  Observable
} from 'rxjs/Rx';
import {
  SecurityProvider
} from '../../providers/security/security';
import {
  TabsPage
} from '../tabs/tabs';
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the EditEventWhatToBringFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event-what-to-bring-form',
  templateUrl: 'edit-event-what-to-bring-form.html',
})
export class EditEventWhatToBringFormPage {
  Menu
  event_id
  menu_id
  bringitem
  bringitems
  items
  eventData
  editbringItems
  constructor(public translateService:TranslateService,public alertCtrl: AlertController, public securityProvider: SecurityProvider, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.Menu = {}
    this.bringitems = []
    this.Menu.bringItems = [];
    this.eventData=this.navParams.get('eventData');
    this.editbringItems=this.navParams.get('editbringItems');
    if (this.eventData) {
		 this.Menu.eventId=this.eventData._id;
		 if (this.editbringItems) {
			this.Menu.whatToBringId=this.editbringItems._id;
			this.Menu.memberId=this.editbringItems.memberId;
			this.Menu.memberName=this.editbringItems.memberName;
			this.Menu.bringItems=this.editbringItems.bringItems;
			this.Menu.status=this.editbringItems.status;
			this.bringitem=this.Menu.bringItems;
		 }
		 else{
  		this.Menu.memberName = localStorage['username'];
      this.Menu.memberId = localStorage['user_id'];
		 }
    }
    else{
    	this.event_id = this.navParams.get('event_id');
      this.menu_id = this.navParams.get('menu_id');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEventWhatToBringFormPage');
  }

  addmore() {
    this.bringitems.push(this.bringitem);
    this.items = this.bringitems;
    this.bringitem = '';
  }
  onSaveMenu() {
	 
  	if (this.editbringItems) {
  		
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.EditbringItem(this.Menu))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Item_updated_successfully'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            var b = a.updatedEventData;
            this.viewCtrl.dismiss(b);
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
  	else{
  		this.Menu.eventId = this.Menu.eventId;
    this.Menu.bringItems = this.bringitem

    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.bringItem(this.Menu))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Item_assigned_successfully'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            var b = a.eventData;
            this.viewCtrl.dismiss(b);
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
    
  }
  Ownername() {
    localStorage['event_id']=this.Menu.eventId;
    let Modal = this.modalCtrl.create('CreateMenuOwnerPage');
    Modal.onDidDismiss(data => {
      if (data) {
        console.log("Owner_data" + JSON.stringify(data));
        var a = data;
        this.Menu.memberName = a.userName;
        this.Menu.memberId = a.user_id;
      }
    });
    Modal.present();
  }
  onClose() {
    this.viewCtrl.dismiss();
  }
}
