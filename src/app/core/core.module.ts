import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
    CacheService, ConfigurationService, LogI18nService, UserContextService,
    EventBusService, SpinnerService
} from 'ra-ng';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {
            provide: CacheService,
            useFactory: (cfgService: ConfigurationService, log: LogI18nService) =>
                new CacheService(cfgService, log, 'memory', 'application'),
            deps: [ConfigurationService, LogI18nService]
        },
        EventBusService,
        {
            provide: UserContextService, useClass: UserContextService,
            deps: [ConfigurationService, CacheService]
        },
        SpinnerService]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import it in the AppModule only.`);
    }
}
