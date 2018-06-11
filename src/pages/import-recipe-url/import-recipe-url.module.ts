import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportRecipeUrlPage } from './import-recipe-url';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    ImportRecipeUrlPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(ImportRecipeUrlPage),
  ],
    providers: [Camera,SecurityProvider,ImagePicker,FileTransfer,File]
})
export class ImportRecipeUrlPageModule {}
