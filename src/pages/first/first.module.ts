import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstPage } from './first';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    FirstPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(FirstPage),   TranslateModule.forChild(),
  ],
  providers:[SecurityProvider,Facebook]
})
export class FirstPageModule {}
