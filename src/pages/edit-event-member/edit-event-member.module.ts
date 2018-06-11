import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEventMemberPage } from './edit-event-member';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditEventMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEventMemberPage),
	TranslateModule.forChild({})
  ],
   providers:[SecurityProvider]
})
export class EditEventMemberPageModule {}
