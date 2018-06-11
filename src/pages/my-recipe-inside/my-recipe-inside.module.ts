import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRecipeInsidePage } from './my-recipe-inside';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyRecipeInsidePage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(MyRecipeInsidePage),
		TranslateModule.forChild({})
	
  ],
      providers:[SecurityProvider,Camera]
})
export class MyRecipeInsidePageModule {}
