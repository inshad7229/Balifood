import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveRecipeDetailPage } from './save-recipe-detail';
import {HttpClientModule} from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    SaveRecipeDetailPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(SaveRecipeDetailPage),
  ],
      providers:[SecurityProvider,SocialSharing]
})
export class SaveRecipeDetailPageModule {}
