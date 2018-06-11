import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EditProfilePage),
  ],
    providers:[SecurityProvider,Camera]
})
export class EditProfilePageModule {}
