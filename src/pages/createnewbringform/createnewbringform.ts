

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

@IonicPage()
@Component({
  selector: 'page-createnewbringform',
  templateUrl: 'createnewbringform.html',
})

export class CreatenewbringformPage {
 
  Menu
  event_id
  menu_id
  bringitem
  bringitems
  items

  constructor(private translate: TranslateService,public alertCtrl: AlertController, public securityProvider: SecurityProvider, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.Menu = {}
    this.event_id = this.navParams.get('event_id');
    this.menu_id = this.navParams.get('menu_id');
    this.bringitems = []
    this.Menu.bringItems = [];
    this.Menu.memberName = localStorage['username'];
    this.Menu.memberId = localStorage['user_id'];
    this.Menu.status='pending';
  }

  onChangeMet() {
    this.Menu.bringitems = this.navParams.get('event_id');
    this.Menu.memberName = this.navParams.get('memberName');
    this.Menu.eventType = this.navParams.get('eventType');
    this.Menu.memberId = localStorage['user_id'];
    this.Menu.menuType = "MutualEvent";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatenewbringformPage');
  }
  addmore() {
    this.bringitems.push(this.bringitem);
    this.items = this.bringitems;
    this.bringitem = '';
  }
  onSaveMenu() {
    this.Menu.eventId = this.event_id;
    this.Menu.bringItems = this.bringitem

    let loading = this.loadingCtrl.create({
      content: this.translate.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.bringItem(this.Menu))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translate.instant('popup.Item_assigned_successfully'),
              buttons: [this.translate.instant('popup.ok')]
            });
            alert.present();
            var b = a.eventData;
            this.viewCtrl.dismiss(b);
          } else {
            let alert = this.alertCtrl.create({
              subTitle: this.translate.instant('popup.Something_went_wrong'),
              buttons: [this.translate.instant('popup.ok')]
            });
            alert.present();
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }

  Ownername() {
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

