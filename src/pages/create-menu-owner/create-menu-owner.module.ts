import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMenuOwnerPage } from './create-menu-owner';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    CreateMenuOwnerPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(CreateMenuOwnerPage),
  ],
  providers:[SecurityProvider]
})
export class CreateMenuOwnerPageModule {}
