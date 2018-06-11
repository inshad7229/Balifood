import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactusPage } from './contactus';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContactusPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(ContactusPage),
	TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class ContactusPageModule {}
