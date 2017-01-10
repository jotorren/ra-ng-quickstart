[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/jotorren/ra-ng-quickstart)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/jotorren/ra-ng-quickstart/blob/master/LICENSE)

# ra-ng Quickstart with SystemJS

This seed repo serves as an Angular 2 starter for anyone looking to get up and running with Angular 2 and TypeScript fast.
* Best practices in file and application organization for Angular 2.
* Testing Angular 2 code with Jasmine and Karma.
* Coverage with Istanbul and Karma
* End-to-end Angular 2 code using Protractor.
* Type manager with @types
* Rich UI design with [primeNG](http://www.primefaces.org/primeng/)
* Recommended design patterns and advanced Angular 2 components with [raNG](https://github.com/jotorren/ra-ng)
* Fully configured SystemJS module loader.
* Ready to go build system using gulp and SystemJS Builder.

### Quick start
```bash
# clone this repo
# --depth 1 removes all but one .git commit history

git clone --depth 1 https://github.com/jotorren/ra-ng-quickstart.git my-project

# change directory to your project
cd my-project

# install the dependency with npm
npm install

# install typescript definitions
typings install

# start the server
npm start
```

go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [Bootstrap](#bootstrap)
* [Building](#building)
* [Contributors](#contributors)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [License](#license)

# File Structure
This starter uses the component approach. This is the new standard for developing Angular apps and a great way to ensure 
maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single 
file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
my-project/
 ├──dist/
 ├──doc/
 ├──e2e/
 ├──node_modules/                       
 ├──typings/                       
 ├──src/
 │   ├──api/
 │   ├──environments/
 │   │   ├──localhost.json
 │   │   ├──environment.ts
 │   │   └──environment.prod.ts
 │   ├──app/
 │   │   ├──core/
 │   │   │   ├──core.module.ts
 │   │   │   └──index.ts
 │   │   │ 
 │   │   ├──layout/
 │   │   │   ├──aside.component.  [css | html | ts]
 │   │   │   ├──footer.component. [css | html | ts]
 │   │   │   ├──header.component. [css | html | ts]
 │   │   │   ├──sidebar.component.[css | html | ts]
 │   │   │   ├──topnav.component. [css | html | ts]
 │   │   │   ├──index.ts
 │   │   │   └──layout.module.ts
 │   │   │
 │   │   ├──shared/
 │   │   │   ├──config/
 │   │   │   │   ├──cache.json
 │   │   │   │   ├──log.json
 │   │   │   │   └──config.ts
 │   │   │   │ 
 │   │   │   ├──i18n/
 │   │   │   │   ├──lang_en.json
 │   │   │   │   └──lang_es.json
 │   │   │   │
 │   │   │   ├──constants.ts
 │   │   │   ├──environment.ts
 │   │   │   ├──index.ts
 │   │   │   └──shared.module.ts
 │   │   │
 │   │   ├──app.component.css
 │   │   ├──app.component.html
 │   │   ├──app.component.ts
 │   │   ├──app.module.ts
 │   │   ├──app.routing.module.ts
 │   │   └──main.ts
 │   │
 │   ├──assets/
 │   │   ├──css/
 │   │   ├──font-awesome-4.6.3/
 │   │   ├──img/
 │   │   └──js/ 
 │   │
 |   ├──favicon.ico
 |   ├──index.html
 |   └──systemjs.config.js
 │   
 ├──gulpfile.js
 ├──karma.conf.js
 ├──karma-systemjs.js
 ├──karma-test-shim.js
 ├──LICENSE
 ├──liteserver.json
 ├──package.json
 ├──protractor.config.js
 ├──README.md
 ├──tsconfig.json
 ├──tslint.json
 └──typings.json
 ```

# Bootstrap
Before starting the Angular 2 application, the configuration service also loads a set of properties that depend on the 
**runtime** environment, which is identified using the **hostname**. Doing so, we can use the same artifact on different
environments without having to rebuild it.

Keep in mind that properties read from the environment always overwrite any potential value defined in the static **Config** 
object literal.

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ConfigurationLoaderService, LoggerFactory, Logger } from 'ra-ng';

import { Config, environment } from './shared';
import { AppModule } from './app.module';

let selector = location.hostname;

if (environment.production) {
  enableProdMode();
}

ConfigurationLoaderService.bootstrap(selector, Config).subscribe(
  (loaded) => {
    LoggerFactory.configure(Config);
    const LOG: Logger = LoggerFactory.getLogger('root');

    LOG.info('Imported JSON configuration for modules: ' + loaded);

    // Compile and launch the module
    platformBrowserDynamic().bootstrapModule(AppModule);
  },
  (err) => {
    console.error('Error loading configuration before launching Angular 2 bootstrap: ', err);
  });
```

For example, if we navigate to `http://localhost:3000`, the configuration service will try to load the properties set
in `environments/localhost.json`, but if we go to `http://myserver:80` (suposing the application is published on
that web server), now the configuration service will look for the `environments/myserver.json` file.

# Building
Default gulp task is for releasing: it does not generate source maps, **inlines** all external template/style files used by any angular component and includes minification.

```
dist/
 ├──src/                        * folder containing all compiled javascript files
 └──public/
     ├──environments/           * runtime configuration json files
     ├──app/                    * i18n and static configuration json files
     ├──assets/                 * static resources (images, fonts, css, js...)
     │   ├──css/                
     │   ├──font-awesome-4.6.3/                
     │   ├──img/                
     │   └──js/                 
     │
     ├──polyfills.js            * minified bundle including standard polyfills we require to run Angular applications in most modern browsers: polyfills, zone and reflect-metadata
     ├──app.js                  * our application code and its dependencies bundled in one minified file. It is independent of the SystemJS loader entirely.
     ├──favicon.ico
     └──index.html              * the application entry point

```

If we look at the `index.html` content:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <base href='/' >
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <title>ra-ng quickstart systemjs</title>

        <link rel="stylesheet" type="text/css" href="./assets/font-awesome-4.6.3/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/primeui-redmond-theme.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/primeui-ng-all.min.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/quill.snow.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/quill.bubble.css" />

        <!-- 1. Load libraries -->
        <script src="./polyfills.js"></script>
        <!-- 2. Load the application and its dependencies -->  
        <script src="./app.js"></script>
	</head>
  
  <!-- 3. Display the application -->
  <body>
    <app-qs>Loading...</app-qs>
  </body>   
</html>
```

# Contributors

| Name               | GitHub                                  | Twitter                                   |
| ------------------ | --------------------------------------- | ----------------------------------------- |
| **Jordi Torrente** | [jotorren](https://github.com/jotorren) | [@esrafiki](https://twitter.com/esrafiki) |

I'll accept pretty much everything so feel free to open a Pull-Request

# Support, Questions, or Feedback

> Contact us anytime for anything about this repo 

[![Join the chat at https://gitter.im/ra-ng/general](https://badges.gitter.im/ra-ng/general.svg)](https://gitter.im/ra-ng/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# License

Code licensed under an [Apache License](https://github.com/jotorren/ra-ng-quickstart/blob/master/LICENSE). Documentation licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).

**[Back to top](#table-of-contents)**