import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportRecipeImagePage } from './import-recipe-image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    ImportRecipeImagePage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(ImportRecipeImagePage),
  ],
  providers: [Camera,SecurityProvider,ImagePicker,FileTransfer,File]
})
export class ImportRecipeImagePageModule {}
