/// <reference path="typings/webpack.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent} from './app/';

if (WEBPACK_ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent);
