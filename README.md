Play 2.5.4 + Angular 2 RC4 seed with Webpack 2 + SBT - based build
======================================================================

This template contains standard distribution of **Play Framework 2.5.4** along with UI built with **Angular 2** (currently RC4).

Angular 2 application is contained in separate directory `ui` and is scaffolded using Angular-CLI. Since Angular-CLI webpack-based build is not ready yet, I've decided to provide my own build system for frontend application and chose Webpack 2 to do that (mostly to benefit from new feature of tree shaking module resolution to keep application size down). Also I've found WebJars and Sbt-Web based frontend build to be too slow and limited for my liking.

Build requirements
------------------

- node: ^6.3.0
- npm: ^3.10.0

These two are required globally at least till I figure out how to handle webpack installation and runs with `sbt-js-engine`. Even if I succeeded in attempt to base js build on `sbt-js-engine` it's still recommended to use `node` for better performance.

Changes and things to know
--------------------------

There are some small albeit important deviations from standard distribution of **PF 2.5.4** and they are mostly related to **sbt build** and **testing harness**:

- scala version was changed to 2.11.8 from 2.11.7
- all sbt-web plugins were removed from `project/plugins.sbt` since Webpack now handles frontend build
- Play run hook `UIBuildHook` was added to `project/` - it's job is handling node modules installation via `npm` and `webpack --watch` when Play is run in dev mode.
- `build.sbt` file contains UI build tasks: npm modules installation and karma tests running along with Play tests
- `ui/dist` folder is listed as unmanaged resource directory, therefore both Play running in dev mode and stage/dist packages have access to it's contents via `Assets` controller. That folder is obviously output directory of Webpack build.
- `IntegrationSpec` was removed, as Selenium Webdriver driven E2E tests are useless due to Protractor integration. One is free to test Angular2-free parts of application using browser-based Play testing classes, but I have to warn you that Webdriver kept crashing with cryptic errors when it tried to download `vendor.js´ part of Angular 2 app.
- Protractor testing is handled using `ProtractorSpec` test class in `test`. I owe that part to unnamed chinese coder who already battled with the idea of running Protractor tests from SBT and failed, so that I didn't have to. Thank you buddy!
- Changes in `ui` folder don't cause Play reloads, but are observed (and handled) by Webpack when Play is running in dev mode.

About the Angular 2 app:

- don't use ng serve or any other Angular CLI command besides scaffolders (`ng generate _`), webpack does all the building
- if you want to serve Angular 2 app without Play you can do so by issuing `npm run dev` in `ui/` directory - this will run webpack-dev-server configured to work in dev mode
- npm dev/dependencies are [shrinkwrapped](https://docs.npmjs.com/cli/shrinkwrap) and therefore frozen - we are using bleeding edge here, no guarantees that BC in some beta dependency won't wreck whole frontend build, so better safe than sorry (this actually occured when I was preparing this package). I will try to keep most important libraries (that is: Angular and Webpack) updated but as long as this works I am going to update things in a cool, controlled fashion. Read about adding npm packages to shrinkwrapped projects at [docs](https://docs.npmjs.com/cli/shrinkwrap).
- **Important**: I am using `angular2-template-loader` to inline templates and styles as Angular 2 Webpack guide advised. For component's directory structure:
```
component/some-funny.component.ts
component/some-funny.component.html
component/some-funny-component.scss
```
annotation syntax in file `some-funny.component.ts`: 
```
@Component({
  templateUrl: 'some-funny.component.html',
  styleUrls: ['some-funny.component.scss']
})
```
will correctly inline styles and templates. **Beware**: apparently `angular2-template-loader` resolves template and style urls relatively to component file which contains referencing annotation. This is different to how Angular 2 normally (meaning with System.JS) works where paths should be relative to document root, not to component.

- As you probably noticed I am also using [SASS](http://sass-lang.com/) via `sass-loader` (cause it's awesome!)

Feel free to ask questions, post issues and even PRs if you find this seed broken or lacking in any way.

Licensing
---------

All libraries and frameworks are licensed under their own licenses. Everything else (meaning my glue code) is under MIT:

The MIT License (MIT)

Copyright (c) 2016 Łukasz Biały

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.