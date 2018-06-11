

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
 * Generated class for the EditEventMenuItemFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event-menu-item-form',
  templateUrl: 'edit-event-menu-item-form.html',
})
export class EditEventMenuItemFormPage {
Menu
eventData
eventType
menu_data
recipe_name
editEvent
grades=[]
  

    constructor(public translateService:TranslateService,public alertCtrl: AlertController, public securityProvider: SecurityProvider, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
        this.Menu = {}
        this.eventData=this.navParams.get('eventData');
        console.log("eventData menu"+JSON.stringify(this.eventData));
        this.editEvent=this.navParams.get('editEvent');
        for (var i = 1; i <= 100; i++) {
           this.grades.push(i);
        }
        var a=this.eventData.eventType;
        if (a=='mutualEvent' ||a=="mutualEvent") {
            this.eventType=a
        }

        if(this.navParams.get('menu_data')) {
            this.menu_data=this.navParams.get('menu_data');
            if (this.menu_data) {
                this.Menu=this.menu_data;
                this.Menu.Recipe_id=this.navParams.get('Recipe_id');
                localStorage['event_id']=this.eventData._id;
                this.Menu.menuId=this.menu_data._id;
                this.Menu.id=this.eventData._id;
                this.Menu.item_name=this.menu_data.item_name;
                this.Menu.owner_name=this.menu_data.owner_name;
                this.Menu.owner_id=this.menu_data.owner_id;
                this.Menu.menuType=this.menu_data.menuType;
                this.Menu.status=this.menu_data.status;
                this.Menu.recipe_name=this.menu_data.recipe_name;
                this.Menu.recipe_link = this.menu_data.Recipe_id;
                this.Menu.grade=this.menu_data.grade;
                this.Menu.score=this.menu_data.score;
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditEventMenuItemFormPage');
    }

    Ownername() {
    		//alert('here');
        let Modal = this.modalCtrl.create('CreateMenuOwnerPage');
        Modal.onDidDismiss(data => {
          if (data) {
    		
            console.log("Owner_data" + JSON.stringify(data));
            var a = data;

            if (this.eventType) {
              this.Menu.owner_name = a.userName;
              this.Menu.owner_id = a.user_id;
            }

          }
        });
        Modal.present();
    }


    onRecipeLink() {
        if(this.menu_data){
          let Modal = this.modalCtrl.create('MyRecipesPage', {
          RecipeLink: 'RecipeLink',
          Menu: this.menu_data,
          eventType:this.eventType,
          eventData:this.eventData,
          menu_data:this.menu_data
        });
        Modal.onDidDismiss(data => {
          if (data) {
        	//alert(JSON.stringify(data));
            console.log("recipe_lin_data" + JSON.stringify(data));
            var a = data;
            var b = data.Recipes;
          }
        });
        Modal.present();
          }else{

        let Modal = this.modalCtrl.create('MyRecipesPage', {
          RecipeLink: 'RecipeLink',
          Menu: this.Menu,
          eventType:this.eventType,
          eventData:this.eventData
         // menu_data:this.Menu

        });
        Modal.onDidDismiss(data => {
          if (data) {
        	//alert(JSON.stringify(data));
            console.log("recipe_lin_data" + JSON.stringify(data));
            var a = data;
            var b = data.Recipes;
          }
        });
        Modal.present();
          }
    }

  onSaveMenu() {
	 //alert(JSON.stringify(this.recipe_name));
	
  	if (this.menu_data) {
		 if(!this.Menu.owner_id){
		 this.Menu.owner_id=localStorage['user_id'];
		 this.Menu.owner_name=localStorage['username'];
	}
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.updateMenu(this.Menu))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
               if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Menu_updated'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            //var b = a.updatedEventData;
             //this.viewCtrl.dismiss(b);
			  //this.navCtrl.push('CreateNewMenuPage',{menuData:b,eventType:this.eventType});
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  	}
  	else{
      this.Menu.event_id=localStorage['event_id'];
	  	 if(!this.Menu.owner_id){
		 this.Menu.owner_id=localStorage['user_id'];
		 this.Menu.owner_name=localStorage['username'];
	 }
  	let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.AddMenu(this.Menu))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Menu_Added'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            var b = a.eventData;
             this.viewCtrl.dismiss(b);
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );	
  	}
    
  }

  onClose() {
    this.viewCtrl.dismiss();
  }


}
