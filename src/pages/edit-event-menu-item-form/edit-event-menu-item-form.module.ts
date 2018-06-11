import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEventMenuItemFormPage } from './edit-event-menu-item-form';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    EditEventMenuItemFormPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EditEventMenuItemFormPage),
  ],
  providers:[SecurityProvider]
})
export class EditEventMenuItemFormPageModule {}
