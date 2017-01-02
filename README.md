[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/jotorren/ra-ng-quickstart)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/jotorren/ra-ng-quickstart/blob/master/LICENSE)

# ra-ng Quickstart

This seed repo serves as an Angular 2 starter for anyone looking to get up and running with Angular 2 and TypeScript fast.
* Best practices in file and application organization for Angular 2.
* Testing Angular 2 code with Jasmine and Karma.
* Coverage with Istanbul and Karma
* End-to-end Angular 2 code using Protractor.
* Type manager with @types
* Rich UI design with [primeNG](http://www.primefaces.org/primeng/)
* Recommended design patterns and advanced Angular 2 components with [raNG](https://github.com/jotorren/ra-ng) 

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
 ├──karma.conf.js
 ├──karma-systemjs.js
 ├──karma-test-shim.js
 ├──liteserver.json
 ├──package.json
 ├──protractor.config.js
 ├──README.md
 ├──tsconfig.json
 ├──tslint.json
 └──typings.json
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