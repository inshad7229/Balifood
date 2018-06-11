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

@IonicPage()
@Component({
  selector: 'page-createnewmenuitemsform',
  templateUrl: 'createnewmenuitemsform.html',
})



export class CreatenewmenuitemsformPage {
  Menu
  event_id
  eventType
  Menuitem
  recipe_name
  grades=[]
  constructor(private translateService: TranslateService,public alertCtrl: AlertController, public securityProvider: SecurityProvider, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.Menu = {}
    this.Menuitem = this.navParams.get('Menuitem')
    this.eventType = this.navParams.get('eventType');
    for (var i = 1; i <= 100; i++) {
      this.grades.push(i);
    }
    localStorage['eventType'] = this.eventType
    if (this.Menuitem) {
      this.Menu.event_id = this.Menuitem.event_id;
      this.Menu.owner_name = this.Menuitem.owner_name;
      this.Menu.status = this.Menuitem.status;
      this.Menu.owner_id = this.Menuitem.owner_id;
      this.Menu.recipe_link = this.Menuitem.Recipe_id;
      this.Menu.item_name = this.Menuitem.item_name;
      this.Menu.menuType = this.Menuitem.menuType;
      this.recipe_name = this.Menuitem.recipe_name;
      this.Menu.grade=this.Menuitem.grade;
      this.Menu.score=this.Menuitem.score;

    } else {
      this.Menu.event_id = localStorage['event_id'];

      if (this.eventType) {

        this.Menu.status = "Pending";
        this.Menu.owner_name = localStorage['username'];
        this.Menu.owner_id = localStorage['user_id'];
      } else {
        this.Menu.owner_id = localStorage['user_id'];
        this.Menu.owner_name = localStorage['username'];
        this.Menu.status = "Confirmed";
      }
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatenewmenuitemsformPage');
  }
  
  goBack(){
	  this.navCtrl.push('EditEventMenuPage')
  }

  Ownername() {
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
	
    let Modal = this.modalCtrl.create('MyRecipesPage', {
      RecipeLink: 'RecipeLink',
      Menu: this.Menu,
      eventType:this.eventType
    });
    Modal.onDidDismiss(data => {
      if (data) {
        console.log("recipe_lin_data" + JSON.stringify(data));
        var a = data;
        var b = data.Recipes;
      }
    });
    Modal.present();
  }

  onSaveMenu() {
	  
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
		this.Menu.event_id=localStorage['event_id'];
		 if(!this.Menu.owner_id){
		 this.Menu.owner_id=localStorage['user_id'];
		 this.Menu.owner_name=localStorage['username'];
	 }
	//alert(JSON.stringify(this.Menu));
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
            // this.navCtrl.setRoot(TabsPage)
            this.navCtrl.push('EditEventMenuPage',{eventData:a.eventData,eventType:this.eventType});
            // this.viewCtrl.dismiss("CreateNewMenuPage",b,b);
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  
 
      
  onClose() {
    this.viewCtrl.dismiss();
  }

}

