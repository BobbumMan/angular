exports.config = {
  allScriptsTimeout: 11000,
  specs: ['e2e/*.js'],
  capabilities: {'browserName' :'firefox'},
  chromeOnly: true,
  baseUrl: 'http://localhost:444/wd/hub/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
