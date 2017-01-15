import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';

import {
    RaNGModule, ConfigurationService, LogService, LogI18nService, LanguageConfigurationService,
    TranslateService, UncontrolledErrorsService
} from 'ra-ng';

import { CoreModule } from './core';
import { AppSharedModule } from './shared';
import { LayoutModule } from './layout';
import { AppRoutingModule } from './app.routing.module';

import { Config } from './shared';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';

export function translateLoaderFactory(cfgService: ConfigurationService) {
    return new LanguageConfigurationService(cfgService, 'i18n_');
}

export function configurationServiceFactory() {
    return new ConfigurationService(Config);
}

export function logServiceFactory() {
    new LogService('app');
}

export function logI18nServiceFactory(i18n: TranslateService) {
    if (!i18n.currentLang) {
        i18n.use(Config.appLang);
    }
    return new LogI18nService('app', i18n);
}

@NgModule({
    imports: [BrowserModule, TranslateModule.forRoot({
        provide: TranslateLoader, useFactory: translateLoaderFactory, deps: [ConfigurationService]
    }), RaNGModule, LayoutModule, AppRoutingModule, CoreModule, AppSharedModule],
    declarations: [
        AppComponent, WelcomeComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ConfigurationService, useFactory: configurationServiceFactory },
        { provide: LogService, useFactory: logServiceFactory },
        { provide: LogI18nService, useFactory: logI18nServiceFactory, deps: [TranslateService] },
        { provide: ErrorHandler, useClass: UncontrolledErrorsService, deps: [LogI18nService] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
