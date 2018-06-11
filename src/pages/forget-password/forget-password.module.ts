import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPage } from './forget-password';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(ForgetPasswordPage),
	TranslateModule.forChild({}),
  ],
    providers:[SecurityProvider]
})
export class ForgetPasswordPageModule {}
