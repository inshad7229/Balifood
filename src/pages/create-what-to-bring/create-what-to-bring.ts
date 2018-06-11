

import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  ModalController
} from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
//import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-create-what-to-bring',
  templateUrl: 'create-what-to-bring.html',
})

export class CreateWhatToBringPage {
  Menu_event = []
  Menu
  event_id
  menu_id
  eventType
  constructor(private translate: TranslateService,public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.Menu = {}
    this.event_id = this.navParams.get('event_id');
    this.eventType = this.navParams.get('eventType');
    this.menu_id = this.navParams.get('menu_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWhatToBringPage');
  }
    onEvent(){
    // this.navCtrl.push('EventsPage');
    this.navCtrl.pop();
  }


  onAdd() {
    let Modal = this.modalCtrl.create('CreatenewbringformPage', {
      event_id: this.event_id,
      eventType: this.eventType,
      menu_id: this.menu_id
    });
    Modal.onDidDismiss(data => {
      if (data) {
        //alert("event_bringitem" + JSON.stringify(data));
        this.Menu_event = data.whatToBring;
      }
    });
    Modal.present();
  }

}

