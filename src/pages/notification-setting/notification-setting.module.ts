import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationSettingPage } from './notification-setting';

@NgModule({
  declarations: [
    NotificationSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationSettingPage),
  ],
})
export class NotificationSettingPageModule {}
