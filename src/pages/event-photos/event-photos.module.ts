import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventPhotosPage } from './event-photos';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    EventPhotosPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EventPhotosPage),
		TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class EventPhotosPageModule {}
