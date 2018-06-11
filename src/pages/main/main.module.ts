import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
  HttpClientModule,
    IonicPageModule.forChild(MainPage),
	TranslateModule.forChild({}),
  ],
  providers:[SecurityProvider,SocialSharing,Camera,StreamingMedia]
})
export class MainPageModule {}
