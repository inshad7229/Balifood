import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController, 
AlertController,
Config,
Platform
} from 'ionic-angular';
import {
  Observable
} from 'rxjs/Rx';
import {
  ModalController
} from 'ionic-angular';
import { 
SecurityProvider
 } from '../../providers/security/security';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-create-new-menu',
  templateUrl: 'create-new-menu.html',
})

export class CreateNewMenuPage {
    Menu_event = []
    Menu
    event_id
    eventType
    eventData
    menuData
    menuPopUp

    constructor(private translate: TranslateService,public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private securityProvider:SecurityProvider) {
        this.Menu = {}
        this.event_id = this.navParams.get('event_id');
        this.eventType = this.navParams.get('eventType');
        this.menuData= this.navParams.get('menuData');
        if (this.menuData) {
          this.Menu_event=this.menuData.menu;
        }
    }

    ionViewDidLoad() {
        this.refreshEvent();
        console.log('ionViewDidLoad CreateNewMenuPage');
    }

    onAdd() {
        let Modal = this.modalCtrl.create('CreatenewmenuitemsformPage', {
          event_id: this.event_id,
          eventType: this.eventType
        });
        Modal.onDidDismiss(data => {
          if (data) {
            console.log("event_menu" + JSON.stringify(data));
            this.Menu_event = data.menu;
            localStorage['menu_id'] = data.owner_id;
          }
        });
        Modal.present();
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
            this.eventType=a.eventType;
            }
           
          }),
          error =>
          loading.dismiss().then(() => {})
        );
	}

    onEvent(){
        this.navCtrl.push('EventsPage');
        // this.navCtrl.pop();
    }
  
    goBack(){
      this.navCtrl.push('EditEventMenuPage', {
        eventData: this.eventData,
        eventType:this.eventType
      });
      this.menuPopUp = true
    }

    onUpdateMenu(menu_data){
        let Modal = this.modalCtrl.create('CreatenewmenuitemsformPage', {
        Menuitem:menu_data,
        event_id:this.event_id
        });
        Modal.onDidDismiss(data => {
          if (data) {
            console.log("event_menu" + JSON.stringify(data));
            this.Menu_event = data.menu;
            localStorage['menu_id'] = data.owner_id;
          }
        });
        Modal.present();
    }

}

