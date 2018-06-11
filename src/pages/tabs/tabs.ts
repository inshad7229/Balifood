import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController ,Tabs} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
@ViewChild('myTabs') tabRef: Tabs;
  tab1Root = 'MainPage';
  tab2Root = 'NotificationPage';
  tab3Root = 'EventsPage';
  tab4Root='MyRecipesPage';
  tab5Root='AccountPage';
  userRegisterFirstTime
  Notifi
  constructor(public securityProvider:SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {
 this.userRegisterFirstTime=this.navParams.get('userRegisterFirstTime');
  }
}
