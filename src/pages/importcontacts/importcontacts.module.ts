import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportcontactsPage } from './importcontacts';
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    ImportcontactsPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportcontactsPage),
  ],
   providers:[SMS]
})
export class ImportcontactsPageModule {}
