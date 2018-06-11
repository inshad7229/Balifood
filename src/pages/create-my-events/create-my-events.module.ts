import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMyEventsPage } from './create-my-events';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    CreateMyEventsPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(CreateMyEventsPage),
  ],
  providers:[SecurityProvider,Camera]
})
export class CreateMyEventsPageModule {}
