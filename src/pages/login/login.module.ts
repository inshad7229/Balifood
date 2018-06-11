import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(LoginPage),
	TranslateModule.forChild({}),
  ],
  providers:[SecurityProvider,FCM,Device]
})
export class LoginPageModule {}
