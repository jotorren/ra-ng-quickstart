import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { ConfigurationLoaderService, LoggerFactory, Logger } from 'ra-ng';

import { Config, environment } from './shared';
import { AppModuleNgFactory } from '../../aot/src/app/app.module.ngfactory';

let selector = location.hostname;
console.log(JSON.stringify({
  logger: 'console',
  message: 'Using configuration selector: [' + selector + ']'
}));

console.log(JSON.stringify({
  logger: 'console',
  message: 'Starting production environment: [' + environment.production + ']'
}));
if (environment.production) {
  enableProdMode();
}

ConfigurationLoaderService.bootstrap(selector, Config).subscribe(
  (loaded) => {
    LoggerFactory.configure(Config);
    const LOG: Logger = LoggerFactory.getLogger('root');

    LOG.info('Imported JSON configuration for modules: ' + loaded);

    // Compile and launch the module
    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
  },
  (err) => {
    console.error('Error loading configuration before launching Angular 2 bootstrap: ', err);
  });
