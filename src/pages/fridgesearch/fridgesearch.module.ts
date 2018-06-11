import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FridgesearchPage } from './fridgesearch';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    FridgesearchPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(FridgesearchPage),
  ],
    providers:[SecurityProvider]
})
export class FridgesearchPageModule {}
