import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEventPage } from './edit-event';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    EditEventPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EditEventPage),
		TranslateModule.forChild({}),
  ],
  providers:[SecurityProvider,Camera]
})
export class EditEventPageModule {}
