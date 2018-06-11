import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEventsPage } from './my-events';
import { SecurityProvider } from '../../providers/security/security';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  
}

@NgModule({
  declarations: [
    MyEventsPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(MyEventsPage),
	TranslateModule.forChild({ loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }}),

  ],
  providers:[SecurityProvider,Camera,FileTransfer,File]
})
export class MyEventsPageModule {}
