import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqPage } from './faq';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';

@NgModule({
  declarations: [
    FaqPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(FaqPage),
  ],
  providers:[SecurityProvider]
})
export class FaqPageModule {}
