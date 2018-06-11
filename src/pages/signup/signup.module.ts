import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { FCM } from '@ionic-native/fcm';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(SignupPage),
	TranslateModule.forChild({})
  ],
    providers:[SecurityProvider,FCM]
})
export class SignupPageModule {}
