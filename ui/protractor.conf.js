exports.config = {
  baseUrl: 'http://localhost:9834/',

  allScriptsTimeout: 10000,

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showTiming: true
  },

  capabilities: {
    // if anything goes wrong - check if changing this to chrome helps
    'browserName': 'phantomjs',

     /*
      * Can be used to specify the phantomjs binary path.
      * This can generally be ommitted if you installed phantomjs globally.
      */
    'phantomjs.binary.path': 'node_modules/phantomjs-prebuilt/bin/phantomjs',

    /*
     * Command line args to pass to ghostdriver, phantomjs's browser driver.
     * See https://github.com/detro/ghostdriver#faq
     */
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],

    // for 'browserName': 'chrome'
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  specs: [
    'e2e/**/*.e2e-spec.js'
  ],

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }
};
