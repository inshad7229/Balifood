import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountMyPostPage } from './account-my-post';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountMyPostPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(AccountMyPostPage),
	TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class AccountMyPostPageModule {}
