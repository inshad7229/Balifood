import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(ChangePasswordPage),
	TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class ChangePasswordPageModule {}
