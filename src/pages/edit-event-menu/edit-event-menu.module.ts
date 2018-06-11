import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEventMenuPage } from './edit-event-menu';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    EditEventMenuPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EditEventMenuPage),
	TranslateModule.forChild({})
  ],
  providers:[SecurityProvider]
})
export class EditEventMenuPageModule {}
