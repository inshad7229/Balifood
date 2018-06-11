import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMutualEventPage } from './create-mutual-event';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    CreateMutualEventPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(CreateMutualEventPage),
  ],
    providers:[SecurityProvider,Camera]
})
export class CreateMutualEventPageModule {}
