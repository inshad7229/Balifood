import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SettingsPage } from "./settings";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {
  Contacts,
  Contact,
  ContactField,
  ContactName
} from "@ionic-native/contacts";
import { SecurityProvider } from "../../providers/security/security";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [SettingsPage],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [SocialSharing, Facebook, Contacts, SecurityProvider]
})
export class SettingsPageModule {}
