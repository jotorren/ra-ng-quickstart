// #docregion
module.exports = function (config) {

  var appBase = 'src/app/';       // transpiled app JS and map files
  var appSrcBase = 'src/app/';       // app source TS files
  var appAssets = '/base/src/app'; // component assets fetched by Angular's compiler

  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
      require('karma-htmlfile-reporter'), // crashing w/ strange socket error
      require('karma-coverage')
    ],

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      // ra-ng
      { pattern: 'node_modules/ra-ng/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/ra-ng/**/*.js.map', included: false, watched: false },

      // other libraries
      { pattern: 'node_modules/angular2-uuid/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/primeng/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/log4javascript/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/cachefactory/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/ng2-translate/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/angular2-jwt/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/crypto-js/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/lodash/**/*.js', included: false, watched: false },
      
      { pattern: 'karma-systemjs.js', included: false, watched: false },
      'karma-test-shim.js',

      // transpiled application & spec code paths loaded via module imports
      { pattern: appBase + '**/*.js', included: false, watched: true },

      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: appBase + '**/*.html', included: false, watched: true },
      { pattern: appBase + '**/*.css', included: false, watched: true },

      // Paths for debugging with source maps in dev tools
      { pattern: appSrcBase + '**/*.ts', included: false, watched: false },
      { pattern: appBase + '**/*.js.map', included: false, watched: false }
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/src/app/": appAssets
    },

    exclude: [
        'e2e/**/*.*'
    ],

    preprocessors: {
      'src/**/!(*spec).js': ['coverage']
    },

    // disabled HtmlReporter; suddenly crashing w/ strange socket error
    reporters: ['progress', 'html', 'coverage'], //'kjhtml' 'html'],

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'doc/coverage/' }
      ]
    },

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: 'doc/unit-tests-result.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },

    browsers: ['Chrome'],

    port: 9876,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    colors: true,
    autoWatch: true,
    singleRun: false,

    captureTimeout: 120000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
  })
}
