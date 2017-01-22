/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    // our app is within the src/app/ folder
    'app': 'src/app',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    // ra-ng
    'ra-ng': 'npm:ra-ng/bundles/ra-ng.umd.js',

    // other libraries
    'ng2-translate/ng2-translate': 'npm:ng2-translate/bundles/ng2-translate.umd.js',
    'log4javascript': 'npm:log4javascript/log4javascript.js',
    'lodash': 'npm:lodash/lodash.js',
    'moment': 'npm:moment/min/moment-with-locales.js',

    'rxjs': 'npm:rxjs',
    'crypto-js': 'npm:crypto-js',
    'primeng': 'npm:primeng'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'crypto-js': { main: 'index.js', defaultExtension: 'js', format: 'cjs' },
    'primeng': { defaultExtension: 'js' }
  };

  var appPackageNames = [
    'core',
    'layout',
    'shared'
  ];

  function packAppIndex(pkgName) {
    packages['app/' + pkgName] = { main: 'index.js' };
  }
  appPackageNames.forEach(packAppIndex);

  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: map,
    // packages tells the System loader how to load when no filename and/or no extension
    packages: packages
  });

  // 'process' will be available inside a TS file with: import * as process from 'process';
  System.set(System.normalizeSync('process'), System.newModule({ env: { ENV: 'development' } }));
})(this);
