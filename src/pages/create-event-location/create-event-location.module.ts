import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEventLocationPage } from './create-event-location';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    CreateEventLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEventLocationPage),
  ],
  providers:[Geolocation]
})
export class CreateEventLocationPageModule {}
