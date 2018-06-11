import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(NotificationPage),
	TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class NotificationPageModule {}
