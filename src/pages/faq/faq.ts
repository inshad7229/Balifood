import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})


export class FaqPage {
  dataa
  answer;
  count = 0;
  constructor(public securityProvider: SecurityProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }
  ngOnInit() {
    this.securityProvider.FaqOpen()
      .subscribe(data => {
        console.log("data" + JSON.stringify(data));
        this.dataa = data.data;
      }),
      error => {}
  }
  question(i) {
    this.count++;
    if (this.count % 2 != 0) {
      this.answer = i;
    } else {
      this.answer = 'p';
    }
  }
}


