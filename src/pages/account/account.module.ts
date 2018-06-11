import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(AccountPage),
	TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class AccountPageModule {}
