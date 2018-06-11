import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRecipesPage } from './my-recipes';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyRecipesPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(MyRecipesPage),
		TranslateModule.forChild({})
  ],
    providers:[SecurityProvider,Camera]
})
export class MyRecipesPageModule {}
