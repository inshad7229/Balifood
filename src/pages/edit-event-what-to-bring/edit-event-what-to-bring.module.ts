import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEventWhatToBringPage } from './edit-event-what-to-bring';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    EditEventWhatToBringPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EditEventWhatToBringPage),
  ],
  providers:[SecurityProvider]
})
export class EditEventWhatToBringPageModule {}
