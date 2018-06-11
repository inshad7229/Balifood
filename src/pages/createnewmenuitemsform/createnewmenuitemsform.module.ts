import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatenewmenuitemsformPage } from './createnewmenuitemsform';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    CreatenewmenuitemsformPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(CreatenewmenuitemsformPage),
  ],
  providers:[SecurityProvider]
})
export class CreatenewmenuitemsformPageModule {}
