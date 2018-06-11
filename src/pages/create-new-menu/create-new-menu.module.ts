import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewMenuPage } from './create-new-menu';

@NgModule({
  declarations: [
    CreateNewMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewMenuPage),
  ],
})
export class CreateNewMenuPageModule {}
