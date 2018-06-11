import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatRecipeCameraPage } from './creat-recipe-camera';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    CreatRecipeCameraPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(CreatRecipeCameraPage),
  ],
    providers: [Camera,SecurityProvider,ImagePicker]
})
export class CreatRecipeCameraPageModule {}
