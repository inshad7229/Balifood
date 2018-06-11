import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPage } from './events';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  
}

@NgModule({
  declarations: [
    EventsPage,
  ],
  imports: [HttpClientModule,
    IonicPageModule.forChild(EventsPage),
	TranslateModule.forChild({ loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }}),
			
  ],
  providers:[SecurityProvider]
})
export class EventsPageModule {}
