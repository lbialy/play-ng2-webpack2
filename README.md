Play 2.6.0 + Angular with Angular-CLI + SBT - based build
======================================================================

This template contains standard distribution of **Play Framework 2.6.0** along with UI built with **Angular** (possibly latest).

Angular 2 application is contained in separate directory `ui` and is scaffolded using Angular-CLI. I've found WebJars and Sbt-Web based frontend build to be too slow and limited for my liking, so SBT is linked with Angular-CLI to handle frontend build.

Build requirements
------------------

- node: ^6.9.0
- npm: ^3.10.0
- angular-cli: ^1.0.0.rc.1 / @latest
- Chrome (for tests)

These three are required globally. `sbt-js-engine` will not be supported (and why should it - it's not like you can develop in Angular without node and npm anyway).

Changes and things to know
--------------------------

There are some small albeit important deviations from standard distribution of **PF 2.6.0** and they are mostly related to **sbt build** and **testing harness**:

- sbt version was changed to 0.13.15 from 0.13.11
- scala version was changed to 2.11.8 from 2.11.7
- all sbt-web plugins were removed from `project/plugins.sbt` since Angular-CLI now handles frontend build
- Play run hook `UIBuildHook` was added to `project/` - it's job is handling node modules installation via `npm` and `npm run build` when Play is run in dev mode.
- `build.sbt` file contains UI build tasks: npm modules installation and karma tests running along with Play tests
- `IntegrationSpec` was removed, as Selenium Webdriver driven E2E tests are useless due to Protractor integration.
- Protractor testing is handled using `ProtractorSpec` test class in `test`. I owe that part to unnamed chinese coder who already battled with the idea of running Protractor tests from SBT and failed, so that I didn't have to. Thank you buddy!
- Changes in `ui` folder don't cause Play reloads, but are observed (and handled) by Angular-CLI when Play is running in dev mode.
- Protractor and Angular 2 unit tests require Chrome as ChromeDriver is supported out-of-the-box by Angular-CLI (I will work on making phantomjs default headless test-runner again).

About the Angular 2 app:

- If you want to serve Angular 2 app without Play you can do so by issuing `npm run start` in `ui/` directory - this will run `ng serve`
- As you probably noticed I am using [SASS](http://sass-lang.com/) via Angular-CLI CSS Preprocessors support (cause it's awesome!)

Migration from beta angular-cli version of this seed (*pre-march 2017*):
- Rules of [angular-cli rc update](https://github.com/angular/angular-cli/wiki/stories-rc-update) apply to your ui project, check commit log to see changed files
- Dropped silly dev flag passed to index view as I managed to find (duh!) `--extract-css` in Angular CLI's docs
- Moved UI build output to `public/ui` directory to handle Issue #4 related to Play not refreshing files from unmanaged sources. That requires small changes in path given to Assets controller in Play views serving Angular App.

Migration from older version of this seed:

- Rules of [angular-cli update](https://github.com/angular/angular-cli/wiki/Upgrading-from-Beta.10-to-Beta.14) apply to your ui project
- Try to match the structure of new `ui` directory
- Refactor tests to use `TestBed` instead of `inject`, use `async` tests for Zone.js async tracking
- Most probably `main.ts` will need some refactoring to match new one - we're using Angular 2 modules now.

Good luck!

Feel free to ask questions, post issues and even PRs if you find this seed broken or lacking in any way.

Licensing
---------

All libraries and frameworks are licensed under their own licenses. Everything else (meaning my glue code) is under MIT:

The MIT License (MIT)

Copyright (c) 2016 Łukasz Biały

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
