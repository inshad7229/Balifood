import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventChatPage } from './event-chat';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  
}


@NgModule({
  declarations: [
    EventChatPage,
  ],
  imports: [
    IonicPageModule.forChild(EventChatPage),
	TranslateModule.forChild({}),
		 TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
}),
  ],
})
export class EventChatPageModule {}
