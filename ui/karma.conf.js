var ENV_PRODUCTION = process.env.NODE_ENV;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/long-stack-trace-zone.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/jasmine-patch.js', included: true, watched: false },
      { pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: false },

      { pattern: 'node_modules/rxjs/**', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },

      { pattern: 'src/app/**/*.spec.ts', included: true }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/**/*.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.ts', '.es6', '.js', '.json']
      },
      module: {
        loaders: [
            {test: /\.ts$/, exclude: /node_modules/, loaders: ['ts', 'angular2-template-loader']},
            {test: /\.json$/, loader: 'json'},
            {test: /\.html/, loader: 'html'},
            {test: /\.scss$/, loaders: ['raw', 'sass']},
            {test: /\.css$/, loader: 'raw'},
            {test: /\.(gif|png|jpe?g)$/i, loader: 'file'}
        ]
      }
    },
    //
    // webpackMiddleware: {
    //   noInfo: true //please don't spam the console when running in karma!
    // },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: ENV_PRODUCTION ? false : true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ENV_PRODUCTION ? ['PhantomJS'] : ['Chrome'],

    phantomjsLauncher: {
       // Have phantomjs exit if a ResourceError is encountered
       // (useful if karma exits without killing phantom)
       exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: ENV_PRODUCTION ? true : false
  });
};
