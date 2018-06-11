import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatenewbringformPage } from './createnewbringform';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    CreatenewbringformPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(CreatenewbringformPage),
  ],
  providers:[SecurityProvider]
})
export class CreatenewbringformPageModule {}
