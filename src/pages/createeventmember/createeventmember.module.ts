import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateeventmemberPage } from './createeventmember';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    CreateeventmemberPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateeventmemberPage),
  ],
  providers:[SecurityProvider]
})
export class CreateeventmemberPageModule {}
