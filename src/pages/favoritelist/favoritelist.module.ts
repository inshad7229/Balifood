import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritelistPage } from './favoritelist';

@NgModule({
  declarations: [
    FavoritelistPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritelistPage),
  ],
})
export class FavoritelistPageModule {}
