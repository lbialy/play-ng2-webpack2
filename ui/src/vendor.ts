///<reference path="./typings/webpack.d.ts" />

// local shims
import './ie-shims/ie-shims';

// polyfills
import 'es6-shim';

// (these modules are what is in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'reflect-metadata';

require('zone.js/dist/zone');

if (WEBPACK_ENV !== 'production') {
  require('zone.js/dist/long-stack-trace-zone');
}

// Angular 2 Deps
import 'rxjs/Rx';
