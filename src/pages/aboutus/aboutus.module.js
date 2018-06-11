var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutusPage } from './aboutus';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var AboutusPageModule = /** @class */ (function () {
    function AboutusPageModule() {
    }
    AboutusPageModule = __decorate([
        NgModule({
            declarations: [
                AboutusPage,
            ],
            imports: [HttpClientModule,
                IonicPageModule.forChild(AboutusPage),
                TranslateModule.forChild({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })
            ],
            providers: [SecurityProvider]
        })
    ], AboutusPageModule);
    return AboutusPageModule;
}());
export { AboutusPageModule };
//# sourceMappingURL=aboutus.module.js.map