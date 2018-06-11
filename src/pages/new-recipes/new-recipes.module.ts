import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRecipesPage } from './new-recipes';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewRecipesPage,
  ],
  imports: [
  HttpClientModule,
    IonicPageModule.forChild(NewRecipesPage),
	TranslateModule.forChild({})
  ],
  providers: [Camera,SecurityProvider,ImagePicker,FileTransfer,File]
})
export class NewRecipesPageModule {}
