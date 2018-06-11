var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SettingsPage } from "./settings";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Facebook } from "@ionic-native/facebook";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Contacts } from "@ionic-native/contacts";
import { SecurityProvider } from "../../providers/security/security";
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        NgModule({
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
    ], SettingsPageModule);
    return SettingsPageModule;
}());
export { SettingsPageModule };
//# sourceMappingURL=settings.module.js.map