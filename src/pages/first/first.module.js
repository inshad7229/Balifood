var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstPage } from './first';
import { Facebook } from '@ionic-native/facebook';
import { SecurityProvider } from '../../providers/security/security';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
var FirstPageModule = /** @class */ (function () {
    function FirstPageModule() {
    }
    FirstPageModule = __decorate([
        NgModule({
            declarations: [
                FirstPage,
            ],
            imports: [HttpClientModule,
                IonicPageModule.forChild(FirstPage), TranslateModule.forChild(),
            ],
            providers: [SecurityProvider, Facebook]
        })
    ], FirstPageModule);
    return FirstPageModule;
}());
export { FirstPageModule };
//# sourceMappingURL=first.module.js.map