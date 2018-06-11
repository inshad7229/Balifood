import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountFriendsPage } from './account-friends';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';


@NgModule({
  declarations: [
    AccountFriendsPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(AccountFriendsPage),
  ],
   providers:[SecurityProvider]
})
export class AccountFriendsPageModule {}
