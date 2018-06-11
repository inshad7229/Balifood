import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEventWhatToBringFormPage } from './edit-event-what-to-bring-form';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';


@NgModule({
  declarations: [
    EditEventWhatToBringFormPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EditEventWhatToBringFormPage),
  ],
  providers:[SecurityProvider]
})
export class EditEventWhatToBringFormPageModule {}
